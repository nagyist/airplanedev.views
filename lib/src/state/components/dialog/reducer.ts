import { DialogState } from "./state";

export type Action = { type: "open" } | { type: "close" };

export type ReducerState = {
  opened: DialogState["opened"];
};

export const reducer = (state: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case "open": {
      return { ...state, opened: true };
    }
    case "close": {
      return { ...state, opened: false };
    }
    default:
      throw new Error("invalid action");
  }
};
