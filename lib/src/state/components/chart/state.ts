import { Datum } from "plotly.js-basic-dist";

import { BaseState, DefaultState } from "../BaseState";

export type SelectedPoint = Record<string, Datum>;

export type ChartState = {
  /**
   * Changes the selected points in the chart.
   */
  changeSelection: (value: SelectedPoint[]) => void;
  /**
   * Clears all selected points on the chart.
   */
  clearSelection: () => void;
  /**
   * The list of points currently selected on the chart. Applicable for bar, line, and scatter charts only.
   */
  selectedPoints: SelectedPoint[];
} & BaseState;

const emptyFn = () => {
  // Empty
};

export const DefaultChartState: DefaultState<ChartState> = {
  selectedPoints: [],
  clearSelection: emptyFn,
  changeSelection: emptyFn,
};
