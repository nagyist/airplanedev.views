import { Input } from "@mantine/core";
import dayjs from "dayjs";
import json5 from "json5";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import {
  ConstraintOption,
  ParamValue,
  ParamValues,
  Parameter,
  isConstraintOptions,
  isTaskOption,
  isTemplate,
} from "client/types";
import { Checkbox } from "components/checkbox/Checkbox";
import { CodeInput } from "components/codeinput/CodeInput";
import { DatePicker } from "components/datepicker/DatePicker";
import { DateTimePicker } from "components/datepicker/DateTimePicker";
import { FileInput } from "components/fileinput/FileInput";
import { NumberInput } from "components/number/NumberInput";
import { Select, outputToData } from "components/select/Select";
import { Textarea } from "components/textarea/Textarea";
import { TextInput } from "components/textinput/TextInput";
import { useTaskQuery } from "state";

import { FieldOption, RunbookOptions, TaskOptions } from "./Form.types";
import { useEvaluateTemplate, useEvaluateTemplates } from "./jst";

interface ParamConfig {
  getInput: (
    props: {
      required: boolean;
      id: string;
      label: string;
    },
    component?: string,
  ) => ReactElement;

  validate: (
    val: string | boolean | Date | number,
    slug: string,
    constraints?: ParamValue[],
  ) => string | undefined;
}

const PARAM_CONFIG_MAP: Record<Parameter["type"], ParamConfig> = {
  boolean: {
    getInput: (props) => <Checkbox {...props} />,
    validate: (val, slug) => {
      if (typeof val !== "boolean") {
        return `Value of param ${slug} must be a boolean`;
      }
    },
  },
  upload: {
    getInput: (props) => <FileInput {...props} />,
    validate: () => {
      return "Cannot set value constraints for file params";
    },
  },
  date: {
    getInput: (props) => <DatePicker {...props} />,
    validate: (val, slug, constraints) => {
      if (
        (typeof val !== "string" && !(val instanceof Date)) ||
        (typeof val === "string" && !dayjs(val).isValid()) ||
        (constraints &&
          constraints.find(
            (v) =>
              typeof v === "string" &&
              new Date(v).getTime() === new Date(val).getTime(),
          ) === undefined)
      ) {
        return `${val} is not a valid value for ${slug}`;
      }
    },
  },
  datetime: {
    getInput: (props) => <DateTimePicker {...props} />,
    validate: (val, slug, constraints) => {
      if (
        (typeof val !== "string" && !(val instanceof Date)) ||
        (typeof val === "string" && !dayjs(val).isValid()) ||
        (constraints &&
          constraints.find(
            (v) =>
              typeof v === "string" &&
              new Date(v).getTime() === new Date(val).getTime(),
          ) === undefined)
      ) {
        return `${val} is not a valid value for ${slug}`;
      }
    },
  },
  float: {
    getInput: (props) => (
      <NumberInput precision={9} removeTrailingZeros {...props} />
    ),
    validate: (val, slug, constraints) => {
      if (typeof val !== "number") {
        return `Value of param ${slug} must be a number`;
      }
      if (
        constraints &&
        constraints.find((v) => Number(v) == val) === undefined
      ) {
        return `${val} is not a valid value for ${slug}`;
      }
    },
  },
  integer: {
    getInput: (props) => <NumberInput {...props} />,
    validate: (val, slug, constraints) => {
      if (typeof val !== "number") {
        return `Value of param ${slug} must be a number`;
      }
      if (
        constraints &&
        constraints.find((v) => Number(v) == val) === undefined
      ) {
        return `${val} is not a valid value for ${slug}`;
      }
    },
  },
  string: {
    getInput: (props, component) => {
      if (component === "textarea") {
        return <Textarea {...props} />;
      } else if (component === "editor-sql") {
        return <CodeInput {...props} language="sql" />;
      }
      return <TextInput {...props} />;
    },
    validate: (val, slug, constraints) => {
      if (typeof val !== "string") {
        return `Value of param ${slug} must be a string`;
      }
      if (constraints && !constraints.includes(val)) {
        return `${val} is not a valid value for ${slug}`;
      }
    },
  },
  json: {
    getInput: (props) => {
      return <CodeInput {...props} language="json" />;
    },
    validate: (val, slug) => {
      if (typeof val !== "string") {
        return `Value of param ${slug} must be a string`;
      }
      try {
        json5.parse(val);
      } catch {
        return `Value of param ${slug} must be valid JSON`;
      }
    },
  },
};

type ParameterInputProps = {
  param: Parameter;
  paramValues: ParamValues;
  idPrefix: string;
  /** A callback that is called to change the value of the parameter. */
  onChange: (value: unknown) => void;
  /** The current value of the parameter. */
  value?: unknown;
  opt?: FieldOption;
};

/** ParameterInput represents the UI component for a single parameter. */
export const ParameterInput = ({
  param,
  idPrefix,
  opt,
  paramValues,
  onChange,
  value,
}: ParameterInputProps) => {
  const defaultValue = opt?.defaultValue ?? param.default;
  const hiddenEval = useEvaluateTemplate(
    param.hidden,
    { params: paramValues },
    { forceEvaluate: true },
  );
  const isHidden =
    param.hidden && (hiddenEval.result || hiddenEval.initialLoading);

  const validateEval = useEvaluateTemplate(
    param.constraints.validate,
    { params: paramValues },
    { forceEvaluate: true },
  );

  const taskBackedConstraintOptionsLoaded = useRef(false);
  const {
    constraintOptions: taskBackedConstraintOptions,
    error: taskBackedConstraintError,
    isLoading: taskBackedConstraintLoading,
  } = useTaskBackedConstraintOptions({
    param,
    paramValues: paramValues ?? {},
    enabled: !isHidden,
  });

  if (
    value &&
    isTaskOption(param.constraints.options) &&
    taskBackedConstraintOptionsLoaded.current &&
    !taskBackedConstraintOptions?.some((o) => o.value === value)
  ) {
    // If the value is not in the list of task-backed constraint options, then it is invalid.
    onChange(undefined);
  }
  if (
    taskBackedConstraintOptions &&
    !taskBackedConstraintOptionsLoaded.current
  ) {
    // After the task backed constraints load a single time, reset the default value.
    if (opt?.value ?? defaultValue) {
      onChange(canonicalizeValue(opt?.value ?? defaultValue, param.type));
    }
    taskBackedConstraintOptionsLoaded.current = true;
  }

  // Hide the param if the hidden expression evaluates to true, or if we're still loading the
  // initial value so we don't know yet.
  if (isHidden) {
    return null;
  }
  if (opt?.value !== undefined) {
    return (
      <Input.Label>{`${param.slug}: ${JSON.stringify(opt.value)}`}</Input.Label>
    );
  }
  const props = {
    required: !param.constraints.optional,
    id: idPrefix + param.slug,
    label: param.name,
    ...(param.type === "boolean"
      ? { defaultChecked: defaultValue == null ? undefined : !!defaultValue }
      : { defaultValue: defaultValue == null ? undefined : defaultValue }),
    validate: (e: unknown): string | undefined => {
      const optValidationResult = opt?.validate?.(e);
      if (optValidationResult) {
        return optValidationResult;
      }
      if (param.constraints.regex && typeof e === "string") {
        const regex = new RegExp(param.constraints.regex);
        if (!regex.test(e)) {
          return `${param.name} does not match the following pattern: ${param.constraints.regex}`;
        }
      }
      if (validateEval.result) {
        return typeof validateEval.result === "string"
          ? validateEval.result
          : JSON.stringify(validateEval.result);
      }
      if (hiddenEval.error) {
        return `Error evaluating hidden expression for ${param.name}: ${hiddenEval.error}`;
      }
      if (validateEval.error) {
        return `Error evaluating validation expression for ${param.name}: ${validateEval.error}`;
      }
      return undefined;
    },
    // This is not param?.desc because we don't want to pass an empty string desc
    description: param.desc || undefined,
    disabled: opt?.disabled,
  };

  let constraintOptions: ConstraintOption[] | undefined = undefined;
  if (param.constraints?.options) {
    if (isConstraintOptions(param.constraints.options)) {
      constraintOptions = param.constraints.options;
    } else if (taskBackedConstraintOptions) {
      constraintOptions = taskBackedConstraintOptions;
    }
  }

  let options:
    | Array<string | number | { value: string | number; label: string }>
    | undefined = undefined;
  if (opt?.allowedValues) {
    options = canonicalizeValues(opt.allowedValues, param.type);
    if (constraintOptions) {
      options = filterValues(
        options as string[],
        constraintOptions,
        param.type,
      );
    }
  } else if (constraintOptions) {
    options = constraintOptions.map((v) => ({
      label: v.label || String(v.value), // Override not set or empty ("") label
      value: typeof v.value === "number" ? v.value : String(v.value),
    }));
  }

  if (options || isTaskOption(param.constraints.options)) {
    return (
      <Select
        clearable
        {...props}
        defaultValue={canonicalizeValue(defaultValue, param.type)}
        data={options ?? []}
        loading={taskBackedConstraintLoading}
        error={taskBackedConstraintError}
      />
    );
  }
  return PARAM_CONFIG_MAP[param.type]?.getInput(props, param.component);
};

export const validateParameterOptions = <TOutput,>(
  params: Parameter[],
  opts: TaskOptions<TOutput> | RunbookOptions,
) => {
  for (const param of params) {
    // Check that all required fields are set or not hidden
    if (
      !param.constraints.optional &&
      ((opts.shownFields && !opts.shownFields.includes(param.slug)) ||
        opts.hiddenFields?.includes(param.slug)) &&
      (!opts.fieldOptions ||
        opts.fieldOptions.find((o) => o.slug === param.slug)?.value ===
          undefined)
    ) {
      return "All required fields that are hidden must have a value specified";
    }
  }
  if (opts.fieldOptions) {
    for (const opt of opts.fieldOptions) {
      // Check no extraneous slugs
      const param = params.find((p) => p.slug === opt.slug);
      if (!param) {
        return `Found extraneous param in fieldOptions: ${opt.slug}`;
      }
      // Check that allowedValues has length at least 2
      if (opt.allowedValues && opt.allowedValues.length < 2) {
        return `allowedValues for param ${opt.slug} must have length at least 2`;
      }

      const constraints = isConstraintOptions(param.constraints.options)
        ? param.constraints.options.map((v) => v.value)
        : undefined;
      // Check that all values are valid
      let valuesToCheck: (string | boolean | Date | number)[] =
        opt.allowedValues || [];
      if (opt.defaultValue !== undefined) {
        valuesToCheck = [...valuesToCheck, opt.defaultValue];
      }
      if (opt.value !== undefined) {
        valuesToCheck = [...valuesToCheck, opt.value];
      }
      for (const val of valuesToCheck) {
        const validateResult = PARAM_CONFIG_MAP[param.type]?.validate(
          val,
          opt.slug,
          constraints,
        );
        if (validateResult) {
          return validateResult;
        }
      }
    }
  }
};

/**
 * Converts `value` to a string.
 */
const canonicalizeValue = (
  value: Date | ParamValue,
  type: string,
): string | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (typeof value === "string") {
    if (type === "date") {
      // For dates, string values are allowed. We canonicalize string values by
      // getting the ISO format string. We need to check if date.getTime() has a
      // valid value, because this function runs before validation, and toISOString
      // will crash the view if the date is invalid. We take the first 10 characters
      // because the backend expects a date format that looks like "2006-01-02".
      const date = dayjs(value);
      return date.isValid() ? date.format("YYYY-MM-DD") : "";
    } else if (type === "datetime") {
      const date = dayjs(value);
      return date.isValid() ? date.toISOString() : "";
    } else {
      return value;
    }
  }
  return JSON.stringify(value);
};

/**
 * Converts `values` to a string array.
 */
const canonicalizeValues = (
  values: Date[] | string[] | number[],
  type: string,
): string[] => {
  if (values[0] instanceof Date) {
    values = (values as Date[]).map((d) => d.toISOString());
  } else if (typeof values[0] === "number") {
    values = values.map((n) => String(n));
  } else if (type === "date") {
    // For dates, string values are allowed. We canonicalize string values by
    // getting the ISO format string. We need to check if date.getTime() has a
    // valid value, because this function runs before validation, and toISOString
    // will crash the view if the date is invalid. We take the first 10 characters
    // because the backend expects a date format that looks like "2006-01-02".
    values = values.map((d) => {
      const date = dayjs(d);
      return date.isValid() ? date.format("YYYY-MM-DD") : "";
    });
  } else if (type === "datetime") {
    values = values.map((d) => {
      const date = dayjs(d);
      return date.isValid() ? date.toISOString() : "";
    });
  }
  return values as string[];
};

/**
 * Returns the subset of `values` that matches a constraint in `constraints`.
 */
const filterValues = (
  values: string[],
  constraints: ConstraintOption[],
  type: string,
): string[] => {
  if (type === "date" || type === "datetime") {
    const constraintValues = constraints.map((v) =>
      new Date(String(v.value)).getTime(),
    );
    return values.filter((v) =>
      constraintValues.includes(new Date(v).getTime()),
    );
  } else {
    const constraintValues = constraints.map((v) => v.value);
    return values.filter((v) => constraintValues.includes(v));
  }
};

/**
 * useTaskBackedConstraintOptions evaluates and executes the task specified in the constraint options and
 * returns the output as constraint options.
 */
const useTaskBackedConstraintOptions = ({
  param,
  paramValues: inputParamValues,
  enabled: inputEnabled = true,
}: {
  param: Parameter;
  paramValues: ParamValues;
  enabled?: boolean;
}) => {
  const [paramValues, setParamValues] = useState(inputParamValues);
  const [enabled, setEnabled] = useState(inputEnabled);
  const debounced = useDebouncedCallback<(pv: typeof inputParamValues) => void>(
    (pv) => {
      setParamValues(pv);
    },
    500,
  );
  useEffect(() => {
    // Debounce paramValues so we don't execute the task every time something changes.
    debounced(inputParamValues);
  }, [debounced, inputParamValues]);

  useEffect(() => {
    // If the enabled state changes, immediately set the paramValues to the inputParamValues.
    setParamValues(inputParamValues);
    setEnabled(inputEnabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputEnabled]);

  const taskBackedOptions = isTaskOption(param.constraints.options)
    ? param.constraints.options
    : undefined;

  // Evaluate any templates that exist in the task params.
  const taskBackedParams = Object.entries(taskBackedOptions?.params ?? {});
  const taskBackedParamTemplates = taskBackedParams.map((p) =>
    isTemplate(p[1]) ? p[1] : "",
  );
  const { results, errors, initialLoading } = useEvaluateTemplates(
    enabled ? taskBackedParamTemplates : undefined,
    {
      params: paramValues,
    },
  );
  const evaluatedTaskBackedParamMap: [string, ParamValue][] =
    taskBackedParams.map((p, i) => {
      if (isTemplate(p[1])) {
        return [p[0], results[i] as ParamValue];
      }
      return p;
    });
  const evaluatedTaskBackedParams = Object.fromEntries(
    evaluatedTaskBackedParamMap,
  );

  // Execute the task once param evaluation is complete.
  const {
    output: taskBackedOutput,
    error: executeError,
    loading: isExecuting,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useTaskQuery<any>({
    slug: taskBackedOptions?.slug ?? "",
    params: evaluatedTaskBackedParams,
    enabled: enabled && !initialLoading && !!taskBackedOptions?.slug,
  });
  // Convert the task output to constraint options.
  const data = taskBackedOutput ? outputToData(taskBackedOutput) : null;
  const constraintOptions = data?.map((d) => ({
    value: typeof d === "object" ? d.value : d,
    label: typeof d === "object" ? d.label || String(d.value) : String(d),
  }));

  return {
    constraintOptions,
    error: [...errors, executeError?.message].filter((e) => !!e).join("\n"),
    isLoading: initialLoading || isExecuting,
  };
};
