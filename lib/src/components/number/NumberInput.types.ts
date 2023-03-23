import {
  CSSObject,
  MantineSize,
  NumberInputProps as MantineNumberInputProps,
} from "@mantine/core";
import React from "react";

import { CommonLayoutProps } from "components/layout/layout.types";
import { CommonStylingProps } from "components/styling.types";
import { InputProps } from "state/components/input/types";
import { NumberInputTValue } from "state/components/number-input/reducer";

export type NumberInputComponentPropsBase = {
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
  value?: number;
  /**
   * Minimum possible value. Inputs are clamped to this minimum.
   */
  min?: number;
  /**
   * Maximum possible value. Inputs are clamped to this maximum.
   */
  max?: number;
  /**
   * Number by which value will be incremented/decremented with controls and
   * up/down arrows. Specify `precision` if using a non-integer step.
   */
  step?: number;
  /**
   * Number of digits after the decimal point.
   */
  precision?: number;
  /**
   * If `precision` is set, removes the trailing zeros.
   * @default false
   */
  removeTrailingZeros?: boolean;
  /**
   * Removes increment/decrement controls.
   */
  hideControls?: boolean;
  /**
   * Callback when input changes when using as a controlled component. Prefer
   * using the global component state.
   */
  onChange?: (value: NumberInputTValue) => void;
  /**
   * Adds an icon to the left of the input.
   */
  icon?: React.ReactNode;
  /**
   * The formatting style to use.
   * @default decimal
   */
  format?: "decimal" | "percent" | "currency";
  /**
   * A three letter currency code to use, such as GBP, if `format` is set to
   * `currency`.
   * @default USD
   */
  currency?:
    | "AUD"
    | "CAD"
    | "CLP"
    | "CNY"
    | "COP"
    | "GBP"
    | "HKD"
    | "INR"
    | "JPY"
    | "KRW"
    | "MYR"
    | "MXN"
    | "NZD"
    | "NOK"
    | "PHP"
    | "SGD"
    | "TWD"
    | "USD"
    | "ZAR"
    | "ARS"
    | "BRL"
    | "CHF"
    | "DKK"
    | "EUR"
    | "ILS"
    | "PLN";
  /**
   * Input appearance.
   */
  variant?: "default" | "unstyled";
  /**
   * CSS style overrides.
   * @deprecated
   */
  sx?: CSSObject;
  classNames?: MantineNumberInputProps["classNames"];
} & CommonLayoutProps &
  CommonStylingProps;

export type NumberInputComponentProps = NumberInputComponentPropsBase &
  Omit<
    JSX.IntrinsicElements["input"],
    keyof NumberInputComponentPropsBase | "ref" | "defaultValue" | "type"
  >;

export type NumberInputProps = {
  /**
   * The ID referenced by the global component state.
   */
  id?: string;
  /**
   * The input value on initial render.
   */
  defaultValue?: number;
  /**
   * The input's disabled state on initial render.
   */
  defaultDisabled?: boolean;
} & InputProps<NumberInputTValue, NumberInputTValue> &
  Omit<NumberInputComponentProps, "defaultValue" | "defaultDisabled" | "id">;
