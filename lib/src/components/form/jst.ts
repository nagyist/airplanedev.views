import { useEffect, useRef, useState } from "react";

import { EVALUATE_TEMPLATE } from "client/endpoints";
import { Fetcher } from "client/fetcher";

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
