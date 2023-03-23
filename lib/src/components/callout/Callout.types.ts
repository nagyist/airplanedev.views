import React from "react";

import { CommonLayoutProps } from "components/layout/layout.types";
import { CommonStylingProps } from "components/styling.types";

export type CalloutVariant =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "neutral";
export type CalloutProps = {
  /**
   * Specify a custom icon or null to hide the icon.
   */
  icon?: React.ReactNode | null;
  /**
   * Callout appearance.
   * @default info
   */
  variant?: CalloutVariant;
  /**
   * Callout title.
   */
  title?: React.ReactNode;
  /**
   * Callout description.
   */
  children?: React.ReactNode;
} & CommonLayoutProps &
  CommonStylingProps;
