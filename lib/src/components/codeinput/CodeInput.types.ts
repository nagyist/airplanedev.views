import React from "react";

import { CommonStylingProps } from "components/styling.types";
import { InputProps } from "state/components/input/types";
import { TextInputTValue } from "state/components/text-input/reducer";

export type CodeInputComponentPropsBase = {
  /**
   * Hint text displayed when the input is empty.
   */
  placeholder?: string;
  /**
   * Label displayed above the input.
   */
  label?: React.ReactNode;
  /**
   * Description displayed below the input.
   */
  description?: React.ReactNode;
  /**
   * Error text displayed below the input.
   */
  error?: React.ReactNode;
  /**
   * Disables the input. Prefer to use defaultDisabled and component state.
   * @default false
   */
  disabled?: boolean;
  /**
   * The value of the input when using as a controlled component. Prefer
   * using defaultValue and the global component state.
   */
  value?: string;
  /**
   * The language that the code input should be configured with.
   */
  language?:
    | "sql"
    | "mysql"
    | "pgsql"
    | "json"
    | "javascript"
    | "jsx"
    | "typescript"
    | "tsx"
    | "yaml";
  /**
   * Whether to show line numbers.
   * @default false
   */
  lineNumbers?: boolean;
  /**
   * Whether to enable code folding.
   * @default false
   */
  foldGutter?: boolean;
  /**
   * Theme of the code input.
   * @default light
   */
  theme?: "dark" | "light";
} & CommonStylingProps;

export type CodeInputProps = {
  /**
   * The ID referenced by the global component state
   */
  id?: string;
  /**
   * The input value on initial render
   */
  defaultValue?: string;
  /**
   * The input's disabled state on initial render
   */
  defaultDisabled?: boolean;
} & InputProps<TextInputTValue, TextInputTValue> &
  CodeInputComponentPropsBase;
