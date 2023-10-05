import { useEffect, useRef, useState } from "react";

import { EVALUATE_TEMPLATE } from "client/endpoints";
import { Fetcher } from "client/fetcher";

/**
 * Parses a template string into template and non-template fragments. For example, the string
 * `Hello {{ "world!"}}!` would be split into ["Hello ", `{{ "world!" }}`, "!"].
 *
 * A fragment in the returned response is a template if it starts with "{{".
 *
 * This logic is a direct port of `expressions.NewTemplate` from airport. Any changes here
 * should be ported to airport and vice-versa.
 */
const newTemplate = (s: string): string[] => {
  if (s.length === 0) {
    return [];
  }

  const fragments: string[] = [];
  let next = ""; // the next fragment to capture
  // const ci = 0; // capture index: we're capturing characters from [0, ci)
  for (let i = 0; i < s.length; i++) {
    const c = s[i]; // current character

    const isLast = i + 1 == s.length;
    if (isLast) {
      next += c;
      continue;
    }

    const nc = s[i + 1]; // next character

    if (c == "{") {
      // If this is not a `{{`, treat it as a raw text.
      if (nc != "{") {
        next += c;
        continue;
      }

      // Otherwise, we found a `{{`. Start processing a template expression.
      // First off, go ahead and capture everything before the `{{` as a fragment.
      if (next.length > 0) {
        fragments.push(next);
        next = "";
      }

      // Next, get the length of the template expression and extract it as a fragment.
      const n = measureTemplateExpression(s.substring(i));

      fragments.push(s.substring(i, i + n + 1));
      i += n;
    } else if (c == "\\") {
      // The backslash is used to escape special runes. To check for this, we inspect the next rune.
      if (nc === "{" || nc === "}" || nc === "\\") {
        // "Escape" the next char so it is treated as raw text by capturing `nc`.
        next += nc; // capture `nc` and ignore `c`
        i++; // skip `nc`
      } else {
        // This is not a valid escape sequence, so we treat the `\` as raw text.
        next += c;
      }
    } else {
      // This is not a special char, so just capture it like normal.
      // Note this includes the `}` char which we only look for after finding a `{{`.
      next += c;
    }
  }

  // Capture any remaining text as a final raw fragment.
  if (next.length > 0) {
    fragments.push(next);
  }

  return fragments;
};

// measureTemplateExpression returns the length of a template expression within `s`. The first
// two chars in `s` must both be opening curly brackets. If there are no valid closing double
// curlys in `s`, an error will be thrown. Otherwise, the length of the template expression
// (which includes both the opening and closing double curlys) will be returned.
const measureTemplateExpression = (s: string): number => {
  // We'll traverse forward until we reach the `}}` that end this template expression.
  // However, the contents of this template expression could contain unrelated curlys.
  // To handle this, maintain the current depth of curlys so we can ignore them.
  let depth = 0;
  // In certain cases, we ignore curlys. Specifically, if a curly is inside of a JS string
  // then we ignore it. We may expand this in the future.
  let qm: "none" | "double" | "single" | "backtick" = "none"; // quote mode
  let pc = ""; // previous char
  // If a template expression contains invalid JS, we'll "close" the template expression
  // with the last `}}` we find, if any.
  let lastdci = -1; // last double curly index

  for (let i = 0; i < s.length; i++) {
    const c = s[i]; // current character

    if (c === "\\") {
      // Check if we are escaping a quote.
      if (i + 1 < s.length) {
        const nc = s[i + 1]; // next character
        if (nc === '"' || nc === "'" || nc === "`") {
          // This is an escaped quote. Skip it in the next pass so it won't update `qm`.
          i++;
        }
      }
    } else if (c === '"') {
      // Toggle the double-quote mode.
      if (qm === "none") {
        qm = "double";
      } else if (qm === "double") {
        qm = "none";
      }
    } else if (c === "'") {
      // Toggle the single-quote mode.
      if (qm === "none") {
        qm = "single";
      } else if (qm === "single") {
        qm = "none";
      }
    } else if (c === "`") {
      // Toggle the backtick-quote mode.
      if (qm === "none") {
        qm = "backtick";
      } else if (qm === "backtick") {
        qm = "none";
      }
    } else if (c === "{") {
      // Ignore curlys inside of strings.
      if (qm === "none") {
        depth++;
      }
    } else if (c === "}") {
      // Ignore curlys inside of strings.
      if (qm === "none") {
        depth--;
      }

      if (pc === "}") {
        // We've found the double closing curlys.
        lastdci = i;
        if (depth === 0) {
          // These curlys match with the original curlys.
          return i;
        }
      }
    }

    pc = c;
  }

  // We were not able to find a closing double curly.
  // If we found as least one double curly, treat that as the end of the template expression.
  if (lastdci > -1) {
    return lastdci;
  }

  // Otherwise, return an error.
  throw new Error("Invalid template");
};

const unpackTemplate = (v: Template | string): string =>
  isTemplate(v) ? v.raw : v;

type EvaluateTemplateOptions = {
  /** If true, the template is always treated as a template even if it isn't wraped in {{}} */
  forceEvaluate?: boolean;
};
/**
 * Hook that evaluates a template with the given args.
 *
 * Returns the result and error of the evaluation.
 *
 * Also returns an initial loading flag that is true until the first result is returned
 * and a loading flag that is true while any evaluation is in progress.
 */
export const useEvaluateTemplate = (
  template?: Template | string,
  args?: Record<string, unknown>,
  opts: EvaluateTemplateOptions = {},
) => {
  const { results, errors, loading, initialLoading } = useEvaluateTemplates(
    [template],
    args,
    opts,
  );
  return { result: results[0], error: errors[0], loading, initialLoading };
};

type TemplateEvalResult = { result?: unknown; error?: string };
/**
 * Hook that evaluates multiple templates with the given args.
 *
 * Returns the results and errors of the evaluation as an array that corresponds to the input templates.
 *
 * Also returns an initial loading flag that is true until all templates have been evaluated once
 * and a loading flag that is true while any evaluation is in progress.
 */
export const useEvaluateTemplates = (
  templates?: Array<string | Template | undefined>,
  args?: Record<string, unknown>,
  opts: EvaluateTemplateOptions = {},
) => {
  const [results, setResults] = useState<(TemplateEvalResult | undefined)[]>(
    [],
  );
  const cacheRef = useRef<Record<string, TemplateEvalResult>>({});
  const numLoadingRef = useRef(0);

  const addResult = (result: TemplateEvalResult | undefined, i: number) => {
    setResults((r) => (r ? [...r.slice(0, i), result, ...r.slice(i + 1)] : r));
  };

  const templatesStr = JSON.stringify(templates);
  const argsStr = JSON.stringify(args);
  useEffect(() => {
    const evaluateServer = async (
      t: Template | string,
      i: number,
      cacheKey: string,
    ) => {
      let response: { value: Record<string, unknown> } | undefined = undefined;
      let errString = "";
      let raw = unpackTemplate(t);
      if (opts.forceEvaluate && !raw.startsWith("{{")) {
        raw = `{{${raw}}}`;
      }
      try {
        const fetcher = new Fetcher();
        response = await fetcher.post<{ value: Record<string, unknown> }>(
          EVALUATE_TEMPLATE,
          {
            value: raw,
            lookupMaps: args,
          },
        );
      } catch (e: unknown) {
        if (e instanceof Error) {
          errString = e.message;
        } else {
          errString = "Unknown error";
        }
      }
      cacheRef.current[cacheKey] = {
        result: response?.value,
        error: errString,
      };
      numLoadingRef.current--;
      addResult({ result: response?.value, error: errString }, i);
    };
    templates?.forEach((t, i) => {
      const cacheKey = JSON.stringify({ t, args });
      if (!t) {
        addResult(undefined, i);
      } else if (cacheRef.current[cacheKey]) {
        addResult(cacheRef.current[cacheKey], i);
      } else if (
        !opts.forceEvaluate &&
        !newTemplate(unpackTemplate(t)).some((f) => f.startsWith("{{"))
      ) {
        // There is no template expression in this string, so we can just return it as-is.
        addResult({ result: unpackTemplate(t) }, i);
      } else {
        numLoadingRef.current++;
        evaluateServer(t, i, cacheKey);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [argsStr, templatesStr, opts.forceEvaluate]);

  const initialLoading =
    templates?.length && results.length !== templates.length;

  return {
    results: results.map((r) => r?.result),
    errors: results.map((r) => r?.error ?? ""),
    initialLoading,
    loading: initialLoading || numLoadingRef.current > 0,
  };
};

type Template = {
  __airplaneType: "template";
  raw: string;
};

const isTemplate = (v: unknown): v is Template =>
  v != null &&
  typeof v === "object" &&
  (v as Template)["__airplaneType"] === "template";
