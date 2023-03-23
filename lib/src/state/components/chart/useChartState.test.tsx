import { act, renderHook } from "test-utils/react";

import type { SelectedPoint } from "./state";
import { useChartState } from "./useChartState";

describe("useChartState", () => {
  describe("point selection", () => {
    it("sets and clears selected points", () => {
      const point1: SelectedPoint = { x: 1, y: 3 };
      const point2: SelectedPoint = { x: 2, y: 4 };

      const { result } = renderHook(() => useChartState("id", {}));

      expect(result.current.selectedPoints.length).toEqual(0);

      act(() => {
        result.current.changeSelection([point1]);
      });
      expect(result.current.selectedPoints).toEqual([point1]);

      act(() => {
        result.current.changeSelection([point1, point2]);
      });
      expect(result.current.selectedPoints).toEqual([point1, point2]);

      act(() => {
        result.current.clearSelection();
      });
      expect(result.current.selectedPoints.length).toBe(0);
    });
  });
});
