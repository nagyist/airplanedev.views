import {
  CSSObject,
  MantineSize,
  Styles,
  TextInputStylesNames,
} from "@mantine/core";
import { ChangeEvent } from "react";
import React from "react";

import { CommonLayoutProps } from "components/layout/layout.types";
import { CommonStylingProps } from "components/styling.types";
import { InputProps } from "state/components/input/types";
import { TextInputTValue } from "state/components/text-input/reducer";

export type TextInputComponentPropsBase = {
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
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles?: Styles<TextInputStylesNames, Record<string, any>>;
} & CommonLayoutProps &
  CommonStylingProps;

export type TextInputComponentProps = TextInputComponentPropsBase &
  Omit<
    JSX.IntrinsicElements["input"],
    keyof TextInputComponentPropsBase | "ref"
  >;

export type TextInputProps = {
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
} & InputProps<TextInputTValue, ChangeEvent<HTMLInputElement>> &
  Omit<
    TextInputComponentProps,
    "defaultValue" | "defaultDisabled" | "id" | "styles"
  >;
