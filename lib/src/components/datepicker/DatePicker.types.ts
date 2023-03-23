import { MantineSize } from "@mantine/core";
import { DatePickerProps as MantineDatePickerProps } from "@mantine/dates";
import React from "react";

import { CommonLayoutProps } from "components/layout/layout.types";
import { CommonStylingProps } from "components/styling.types";
import { DatePickerTValue } from "state/components/datepicker/reducer";
import { InputProps } from "state/components/input/types";

type PropsBase = {
  /**
   * Hint text displayed when the picker is empty.
   */
  placeholder?: string;
  /**
   * Label displayed above the picker.
   */
  label?: React.ReactNode;
  /**
   * Description displayed below the picker.
   */
  description?: React.ReactNode;
  /**
   * Error text displayed below the picker.
   */
  error?: React.ReactNode;
  /**
   * Disables the picker. Prefer to use defaultDisabled and component state.
   */
  disabled?: boolean;
  /**
   * Picker size.
   * @default sm
   */
  size?: MantineSize;
  /**
   * Called when the date changes. Prefer to use component state to get the value.
   */
  onChange?: (value: DatePickerTValue) => void;
  /**
   * Selected date if using this component as a controlled component. Prefer to use the
   * component state to get the value.
   */
  value?: DatePickerTValue;
  /**
   * Input border radius.
   */
  radius?: MantineSize;
  /**
   * Whether the calendar dropdown should be open initially.
   * @default false
   */
  initiallyOpened?: boolean;
  /**
   * Callback function to determine if day should be disabled.
   */
  excludeDate?: (date: Date) => boolean;
  /**
   * Allow the date value to be cleared.
   * @default false
   */
  clearable?: boolean;
  /**
   * Callback function that is called when the picker dropdown closes.
   */
  onDropdownClose?: () => void;
  /**
   * Picker appearance.
   */
  variant?: "default" | "unstyled";
  /**
   * Whether to automatically focus on the picker input.
   */
  autoFocus?: boolean;

  withinPortal?: boolean;
  classNames?: MantineDatePickerProps["classNames"];
} & CommonLayoutProps &
  CommonStylingProps;

export type DatePickerComponentProps = PropsBase & {
  /**
   * Whether to close the calendar when a date is selected.
   * @default true
   */
  closeCalendarOnChange?: boolean;
};

export type DateTimePickerComponentProps = PropsBase;

export type DatePickerProps = {
  /**
   * The ID referenced by the global component state.
   */
  id?: string;
  /**
   * The picker value on initial render.
   */
  defaultValue?: Date;
  /**
   * The picker's disabled state on initial render.
   */
  defaultDisabled?: boolean;
} & InputProps<DatePickerTValue, DatePickerTValue> &
  Omit<DatePickerComponentProps, "withinPortal">;

export type DateTimePickerProps = {
  /**
   * The ID referenced by the global component state.
   */
  id?: string;
  /**
   * The picker value on initial render.
   */
  defaultValue?: Date;
  /**
   * The picker's disabled state on initial render.
   */
  defaultDisabled?: boolean;
} & InputProps<DatePickerTValue, DatePickerTValue> &
  Omit<DateTimePickerComponentProps, "withinPortal">;
