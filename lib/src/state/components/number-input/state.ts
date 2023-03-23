import { InputState } from "state/components/input/reducer";
import { StateSetters } from "state/components/input/useStateSetters";

import { NumberInputTValue } from "./reducer";
import { BaseState, DefaultState } from "../BaseState";

export type NumberInputState = BaseState &
  InputState<NumberInputTValue> &
  StateSetters<NumberInputTValue>;
export type SliderState = NumberInputState;

export type InitialNumberInputState = {
  value?: number;
  disabled?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFn = () => {};
export const DefaultNumberInputState: DefaultState<NumberInputState> = {
  value: undefined,
  setValue: emptyFn,
  disabled: false,
  setDisabled: emptyFn,
  errors: [],
  showErrors: false,
  setShowErrors: emptyFn,
  reset: emptyFn,
};
