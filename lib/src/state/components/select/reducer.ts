import { InputAction, inputReducer } from "state/components/input/reducer";

export type SelectTValue = string | number | undefined;
export type Action = InputAction<SelectTValue>;
export const reducer = inputReducer<SelectTValue>;
