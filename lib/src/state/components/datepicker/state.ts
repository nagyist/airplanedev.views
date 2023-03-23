import { InputState } from "state/components/input/reducer";
import { StateSetters } from "state/components/input/useStateSetters";

import { DatePickerTValue } from "./reducer";
import { BaseState, DefaultState } from "../BaseState";

export type DatePickerState = BaseState &
  InputState<DatePickerTValue> &
  StateSetters<DatePickerTValue>;

export type InitialDatePickerState = {
  value?: Date;
  disabled?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFn = () => {};
export const DefaultDatePickerState: DefaultState<DatePickerState> = {
  value: undefined,
  setValue: emptyFn,
  disabled: false,
  setDisabled: emptyFn,
  errors: [],
  showErrors: false,
  setShowErrors: emptyFn,
  reset: emptyFn,
};
