import { InputAction, inputReducer } from "state/components/input/reducer";

export type TextInputTValue = string;
export type Action = InputAction<TextInputTValue>;
export const reducer = inputReducer<TextInputTValue>;
