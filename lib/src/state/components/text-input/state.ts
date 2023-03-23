import { InputState } from "state/components/input/reducer";
import { StateSetters } from "state/components/input/useStateSetters";

import { TextInputTValue } from "./reducer";
import { BaseState, DefaultState } from "../BaseState";

export type TextInputState = {
  focus: () => void;
} & BaseState &
  InputState<TextInputTValue> &
  StateSetters<TextInputTValue>;
export type CodeInputState = TextInputState;

export type InitialTextInputState = {
  value?: string;
  disabled?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFn = () => {};
export const DefaultTextInputState: DefaultState<TextInputState> = {
  value: undefined,
  setValue: emptyFn,
  disabled: false,
  setDisabled: emptyFn,
  focus: emptyFn,
  errors: [],
  showErrors: false,
  setShowErrors: emptyFn,
  reset: emptyFn,
};
