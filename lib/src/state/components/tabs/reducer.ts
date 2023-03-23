import { TabsState, TabsValue } from "./state";

export type Action = { type: "setValue"; value: TabsValue };

export type ReducerState = {
  value: TabsState["value"];
};

export const reducer = (state: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case "setValue": {
      const { value } = action;
      return { ...state, value };
    }
    default:
      throw new Error("invalid action");
  }
};
