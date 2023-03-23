import { InputAction, inputReducer } from "state/components/input/reducer";

export type RadioGroupTValue = string | undefined;
export type Action = InputAction<RadioGroupTValue>;
export const reducer = inputReducer<RadioGroupTValue>;
