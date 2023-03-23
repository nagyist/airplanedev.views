import {
  CSSObject,
  MantineSize,
  TextareaProps as MantineTextareaProps,
} from "@mantine/core";
import { ChangeEvent } from "react";
import React from "react";

import { CommonLayoutProps } from "components/layout/layout.types";
import { CommonStylingProps } from "components/styling.types";
import { InputProps } from "state/components/input/types";
import { TextInputTValue } from "state/components/text-input/reducer";

export type TextareaComponentPropsBase = {
  /**
   * Whether textarea will grow with content until maxRows are reached.
   * @default false
   */
  autosize?: boolean;
  /**
   * Maximum number of rows if autosize is set.
   */
  maxRows?: number;
  /**
   * Number of rows, or minimum number of rows if autosize is set.
   */
  minRows?: number;
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
   */
  disabled?: boolean;
  /**
   * Input size.
   */
  size?: MantineSize;
  /**
   * The input's border radius.
   */
  radius?: MantineSize;
  /**
   * The value of the input when using as a controlled component. Prefer
   * using defaultValue and the global component state.
   */
  value?: string;
  /**
   * Callback when input changes when using as a controlled component. Prefer
   * using the global component state.
   */
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Adds an icon to the left of the input.
   */
  icon?: React.ReactNode;
  /**
   * Input appearance.
   */
  variant?: "default" | "unstyled";
  /**
   * CSS style overrides.
   * @deprecated
   */
  sx?: CSSObject;
  classNames?: MantineTextareaProps["classNames"];
  styles?: MantineTextareaProps["styles"];
} & CommonLayoutProps &
  CommonStylingProps;

export type TextareaComponentProps = TextareaComponentPropsBase &
  Omit<
    JSX.IntrinsicElements["textarea"],
    keyof TextareaComponentPropsBase | "ref"
  >;

export type TextareaProps = {
  /**
   * The ID referenced by the global component state.
   */
  id?: string;
  /**
   * The input value on initial render.
   */
  defaultValue?: string;
  /**
   * The input's disabled state on initial render.
   */
  defaultDisabled?: boolean;
} & InputProps<TextInputTValue, ChangeEvent<HTMLTextAreaElement>> &
  Omit<TextareaComponentProps, "defaultValue" | "defaultDisabled" | "id">;
