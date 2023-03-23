import { InputAction, inputReducer } from "state/components/input/reducer";

export type BooleanTValue = boolean;
export type Action = InputAction<BooleanTValue>;
export const reducer = inputReducer<BooleanTValue>;

export type CheckboxTValue = BooleanTValue;
export type SwitchTValue = BooleanTValue;
