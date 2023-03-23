import { InputAction, inputReducer } from "state/components/input/reducer";

export type NumberInputTValue = number | undefined;
export type Action = InputAction<NumberInputTValue>;
export const reducer = inputReducer<NumberInputTValue>;
