import { AirplaneFile } from "airplane";

import { InputAction, inputReducer } from "state/components/input/reducer";

export type FileInputTValue = AirplaneFile[] | AirplaneFile | undefined;
export type Action = InputAction<FileInputTValue>;
export const reducer = inputReducer<FileInputTValue>;
