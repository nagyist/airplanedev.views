import { MutationState } from "state/tasks/useTaskMutation";

import { BaseState, DefaultState } from "../BaseState";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Result = MutationState<any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableState<TRowData = any> = {
  selectedRows: TRowData[];
  selectedRow?: TRowData;
  changeRowSelection: (rows: TRowData[]) => void;
  clearSelection: () => void;
  rowActionResult: Result | null;
  setRowActionResult: (mutation: Result) => void;
} & BaseState;

const emptyFn = () => {
  // Empty
};

export const DefaultTableState: DefaultState<TableState> = {
  selectedRows: [],
  changeRowSelection: emptyFn,
  clearSelection: emptyFn,
  rowActionResult: null,
  setRowActionResult: emptyFn,
};
