import { InputState } from "state/components/input/reducer";
import { StateSetters } from "state/components/input/useStateSetters";

import { BooleanTValue } from "./reducer";
import { BaseState, DefaultState } from "../BaseState";

export type BooleanState = {
  checked: boolean;
  setChecked: (checked: boolean) => void;
} & BaseState &
  InputState<BooleanTValue> &
  StateSetters<BooleanTValue>;

export type CheckboxState = BooleanState;
export type SwitchState = BooleanState;

export type InitialBooleanState = {
  value?: boolean;
  disabled?: boolean;
};

const emptyFn = () => {
  // Do nothing
};
export const DefaultBooleanState: DefaultState<BooleanState> = {
  value: undefined,
  setValue: emptyFn,
  checked: false,
  setChecked: emptyFn,
  disabled: false,
  setDisabled: emptyFn,
  errors: [],
  showErrors: false,
  setShowErrors: emptyFn,
  reset: emptyFn,
};
