import { InputState } from "state/components/input/reducer";
import { StateSetters } from "state/components/input/useStateSetters";

import { RadioGroupTValue } from "./reducer";
import { BaseState, DefaultState } from "../BaseState";

export type RadioGroupState = BaseState &
  InputState<RadioGroupTValue> &
  StateSetters<RadioGroupTValue>;

export type InitialRadioGroupState = {
  value?: string;
  disabled?: boolean;
};

const emptyFn = () => {
  // Do nothing
};
export const DefaultRadioGroupState: DefaultState<RadioGroupState> = {
  value: undefined,
  setValue: emptyFn,
  disabled: false,
  setDisabled: emptyFn,
  errors: [],
  showErrors: false,
  setShowErrors: emptyFn,
  reset: emptyFn,
};
