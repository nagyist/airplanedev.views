import type { SelectedPoint } from "./state";

export type Action = {
  type: "changeSelection";
  points: SelectedPoint[];
};

export type ReducerState = {
  selectedPoints: SelectedPoint[];
};

export const reducer = (state: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case "changeSelection": {
      const { points } = action;
      return {
        ...state,
        selectedPoints: points,
      };
    }
    default:
      throw new Error("invalid action");
  }
};
