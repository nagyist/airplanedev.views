import { CSSObject } from "@mantine/core";
import { MantineSize as Size } from "@mantine/styles";
import React from "react";

import { CommonStylingProps } from "components/styling.types";
import type { Color } from "components/theme/colors";
import { SwitchTValue } from "state/components/boolean/reducer";
import { InputProps } from "state/components/input/types";

export type SwitchComponentPropsBase = {
  /**
   * Size of the switch.
   */
  size?: Size;
  /**
   * Color of the switch.
   */
  color?: Color;
  /**
   * Switch label. Can be a string or a React component.
   */
  label?: React.ReactNode;
  /**
   * Description displayed below the switch. Can be a string or a React component.
   */
  description?: React.ReactNode;
  /**
   * Whether the switch is checked when using as a controlled component. Prefer
   * using defaultChecked and the global component state.
   */
  checked?: SwitchTValue;
  /**
   * Callback when checked state changes when using as a controlled component. Prefer
   * using the global component state.
   */
  onChange?: (checked: SwitchTValue) => void;
  /**
   * Displays error message after the switch input. Can be a string or a React component.
   */
  error?: React.ReactNode;
  /**
   * Inner label when the switch is unchecked. Can be a string or a React component.
   */
  offLabel?: React.ReactNode;
  /**
   * Inner label when the switch is checked. Can be a string or a React component.
   */
  onLabel?: React.ReactNode;
  /**
   * CSS style overrides.
   * @deprecated
   */
  sx?: CSSObject;
} & CommonStylingProps;

export type SwitchComponentProps = SwitchComponentPropsBase &
  Omit<JSX.IntrinsicElements["input"], keyof SwitchComponentPropsBase | "ref">;

export type SwitchProps = {
  /**
   * The ID referenced by the global component state.
   */
  id?: string;
  /**
   * Whether the switch is initially disabled.
   */
  defaultDisabled?: boolean;
  /**
   * Whether the switch is initially checked.
   */
  defaultChecked?: boolean;
} & InputProps<SwitchTValue, boolean> &
  SwitchComponentProps;
