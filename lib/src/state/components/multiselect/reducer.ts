import { InputAction, inputReducer } from "state/components/input/reducer";

export type MultiSelectTValue = (string | number)[];
export type Action = InputAction<MultiSelectTValue>;
export const reducer = inputReducer<MultiSelectTValue>;
