import React from "react";

import { CommonStylingProps } from "components/styling.types";
import { COLORS } from "components/theme/colors";

export type ChipColor = keyof typeof COLORS | "auto";

export type ChipProps = {
  /**
   * Chip contents.
   */
  children?: React.ReactNode;
  /**
   * Size of the chip.
   * @default md
   */
  size?: "sm" | "md" | "lg";
  /**
   * Color of the chip.
   *
   * "auto" will automatically choose a color for string or number children.
   * @default primary
   */
  color?: ChipColor;
  /**
   * Appearance of the chip.
   * @default light
   */
  variant?: "light" | "filled" | "outline";
} & CommonStylingProps;
