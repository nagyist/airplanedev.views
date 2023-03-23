import { MantineNumberSize } from "@mantine/styles";
import React from "react";

import { CommonLayoutProps } from "components/layout/layout.types";
import { CommonStylingProps } from "components/styling.types";
import type { Color } from "components/theme/colors";
import { InputProps } from "state/components/input/types";
import { NumberInputTValue } from "state/components/number-input/reducer";

export type ValueLabelDisplayOption = "auto" | "on" | "off";

export type SliderComponentProps = {
  /** Color of the slider. */
  color?: Color;
  /**
   * Size of the slider.
   * @default md
   */
  size?: "sm" | "md" | "lg";
  /** Border radius of the slider. */
  radius?: MantineNumberSize;
  /** Whether the slider is disabled. */
  disabled?: boolean;
  /** Whether the slider is inverted. */
  inverted?: boolean;
  /** Default value for the slider. */
  defaultValue?: number;
  /**
   * Selected value if using this component as a controlled component. Prefer to use
   * the component state to get the value.
   */
  value?: number;
  /**
   * Marks will be shown on the track of the slider.
   */
  marks?: { value: number; label?: React.ReactNode }[];
  /**
   * Maximum value of the slider.
   * @default 100
   * */
  max?: number;
  /**
   * Minimum value of the slider.
   * @default 0
   */
  min?: number;
  /**
   * Number to increment/decrement the value by when the slider is dragged or
   * changed using arrows.
   * @default 1
   */
  step?: number;
  /**
   * Label displayed above the slider.
   */
  label?: React.ReactNode;
  /**
   * Displays error message underneath the slider component. Can be a string or a React component.
   */
  error?: React.ReactNode;
  /**
   * Function to generate a label for the slider.
   */
  valueLabel?: React.ReactNode | ((value: number) => React.ReactNode);
  /**
   * auto: label is shown on hover and focus.
   * on: label is always shown.
   * off: label is never shown.
   * @default auto
   */
  valueLabelDisplay?: ValueLabelDisplayOption;
  /** Function that is called each time the value changes. */
  onChange?: (value: number) => void;
  /** Function that is called when the user stops dragging the slider/changing values. */
  onChangeEnd?: (value: number) => void;
} & CommonLayoutProps &
  CommonStylingProps;

export type SliderProps = {
  /**
   * The ID referenced by the global component state.
   */
  id?: string;
  /**
   * The slider value on initial render.
   */
  defaultValue?: number;
  /**
   * The slider's disabled state on initial render.
   */
  defaultDisabled?: boolean;
} & InputProps<NumberInputTValue, NumberInputTValue> &
  SliderComponentProps;
