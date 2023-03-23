import { AirplaneFile } from "airplane";

import { InputState } from "state/components/input/reducer";
import { StateSetters } from "state/components/input/useStateSetters";

import { FileInputTValue } from "./reducer";
import { BaseState, DefaultState } from "../BaseState";

export type FileInputState = BaseState &
  InputState<FileInputTValue> &
  StateSetters<FileInputTValue>;

export type InitialFileInputState = {
  disabled?: boolean;
  initialValue?: AirplaneFile | AirplaneFile[];
};

const emptyFn = () => {
  // Empty
};
export const DefaultFileInputState: DefaultState<FileInputState> = {
  value: undefined,
  setValue: emptyFn,
  disabled: false,
  setDisabled: emptyFn,
  errors: [],
  showErrors: false,
  setShowErrors: emptyFn,
  reset: emptyFn,
};
