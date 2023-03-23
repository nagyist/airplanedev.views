import { InputState } from "state/components/input/reducer";
import { StateSetters } from "state/components/input/useStateSetters";

import { SelectTValue } from "./reducer";
import { BaseState, DefaultState } from "../BaseState";

export type SelectState = BaseState &
  InputState<SelectTValue> &
  StateSetters<SelectTValue>;

export type InitialSelectState = {
  value?: string | number;
  disabled?: boolean;
};

const emptyFn = () => {
  // Do nothing
};
export const DefaultSelectState: DefaultState<SelectState> = {
  value: undefined,
  setValue: emptyFn,
  disabled: false,
  setDisabled: emptyFn,
  errors: [],
  showErrors: false,
  setShowErrors: emptyFn,
  reset: emptyFn,
};
