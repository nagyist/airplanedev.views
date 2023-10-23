import { InputAction, inputReducer } from "../input/reducer";

export const reducer = inputReducer;
export type Action<T> = InputAction<T>;
