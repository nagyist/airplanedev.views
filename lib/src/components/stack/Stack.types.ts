import { CSSObject } from "@mantine/core";
import React from "react";

import { CommonLayoutProps } from "components/layout/layout.types";
import { CommonStylingProps } from "components/styling.types";

export type StackProps = {
  /**
   * Items of the stack.
   */
  children: React.ReactNode;
  /**
   * Direction of the stack.
   * @default column
   */
  direction?: "row" | "column";
  /**
   * Position of the stack on the vertical axis for column stacks and the horizontal axis for row stacks.
   * @default start
   */
  justify?: "start" | "end" | "center" | "space-between" | "space-around";
  /**
   * Alignment of the stack on the horizontal axis for column stacks and the vertical axis for row stacks.
   * @default stretch
   */
  align?: "stretch" | "center" | "start" | "end";
  /**
   * Spacing between items of the stack.
   * @default md
   */
  spacing?: number | "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Allow wrapping of the stack items to multiple lines.
   * @default false
   */
  wrap?: boolean;
  /**
   * Allow scrolling of the stack.
   * @default false
   */
  scroll?: boolean;
  /**
   * CSS style overrides.
   * @deprecated
   */
  sx?: CSSObject;
} & CommonLayoutProps &
  CommonStylingProps;
