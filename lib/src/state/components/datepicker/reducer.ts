import { InputAction, inputReducer } from "state/components/input/reducer";

export type DatePickerTValue = Date | undefined;
export type Action = InputAction<DatePickerTValue>;
export const reducer = inputReducer<DatePickerTValue>;
