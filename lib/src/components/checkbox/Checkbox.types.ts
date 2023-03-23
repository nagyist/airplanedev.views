import {
  CheckboxProps as MantineCheckboxProps,
  MantineSize,
  CSSObject,
} from "@mantine/core";
import { MantineSize as Size } from "@mantine/styles";
import { ReactNode } from "react";
import * as React from "react";

import { CommonStylingProps } from "components/styling.types";
import type { Color } from "components/theme/colors";
import { CheckboxTValue } from "state/components/boolean/reducer";
import { InputProps } from "state/components/input/types";

export type CheckboxComponentPropsBase = {
  /**
   * Size of the checkbox.
   */
  size?: Size;
  /**
   * Color of the checkbox.
   */
  color?: Color;
  /**
   * Checkbox label. This can be a string or a React component.
   */
  label?: React.ReactNode;
  /**
   * Description displayed below the checkbox. This can be a string or a React component.
   */
  description?: React.ReactNode;
  /**
   * The border-radius of the checkbox.
   */
  radius?: MantineSize;
  /**
   * Whether the checkbox is checked when using as a controlled component. Prefer
   * using defaultChecked and the global component state.
   */
  checked?: CheckboxTValue;
  /**
   * Callback when checked state changes when using as a controlled component. Prefer
   * using the global component state.
   */
  onChange?: (checked: CheckboxTValue) => void;
  /**
   * Displays error message after the select input. Can be a string or a React component.
   */
  error?: ReactNode;
  /**
   * If true, the checkbox is in an indeterminate state.
   */
  indeterminate?: boolean;
  /**
   * CSS style overrides.
   * @deprecated
   */
  sx?: CSSObject;
  styles?: MantineCheckboxProps["styles"];
  classNames?: MantineCheckboxProps["classNames"];
} & CommonStylingProps;

export type CheckboxComponentProps = CheckboxComponentPropsBase &
  Omit<
    JSX.IntrinsicElements["input"],
    keyof CheckboxComponentPropsBase | "ref"
  >;

export type CheckboxProps = {
  /**
   * The ID referenced by the global component state.
   */
  id?: string;
  /**
   * Whether the checkbox is initially disabled.
   */
  defaultDisabled?: boolean;
  /**
   * Whether the checkbox is initially checked.
   */
  defaultChecked?: boolean;
} & InputProps<CheckboxTValue, boolean> &
  Omit<CheckboxComponentProps, "styles">;
