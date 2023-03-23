import { InputState } from "state/components/input/reducer";
import { StateSetters } from "state/components/input/useStateSetters";

import { MultiSelectTValue } from "./reducer";
import { BaseState, DefaultState } from "../BaseState";

export type MultiSelectState = BaseState &
  InputState<MultiSelectTValue> &
  StateSetters<MultiSelectTValue>;

export type InitialMultiSelectState = {
  value?: (string | number)[];
  disabled?: boolean;
};

const emptyFn = () => {
  // Do nothing
};
export const DefaultMultiSelectState: DefaultState<MultiSelectState> = {
  value: undefined,
  setValue: emptyFn,
  disabled: false,
  setDisabled: emptyFn,
  errors: [],
  showErrors: false,
  setShowErrors: emptyFn,
  reset: emptyFn,
};
