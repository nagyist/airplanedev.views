import { CSSProperties } from "react";

import { StackProps } from "./Stack.types";

export const justifyToJustifyContent: Record<
  NonNullable<StackProps["justify"]>,
  CSSProperties["justifyContent"]
> = {
  center: "center",
  start: "flex-start",
  end: "flex-end",
  "space-around": "space-around",
  "space-between": "space-between",
};

export const alignToAlignItems: Record<
  NonNullable<StackProps["align"]>,
  CSSProperties["alignItems"]
> = {
  center: "center",
  start: "flex-start",
  end: "flex-end",
  stretch: "stretch",
};
