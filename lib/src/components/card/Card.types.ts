import { MantineNumberSize, MantineShadow, CSSObject } from "@mantine/core";
import React from "react";

import { CommonLayoutProps } from "components/layout/layout.types";
import { CommonStylingProps } from "components/styling.types";

export type CardProps = {
  /**
   * Content of the card.
   */
  children: React.ReactNode;
  /**
   * Shadow around the card.
   */
  shadow?: MantineShadow;
  /**
   * Whether the card is surrounded by a 1px border.
   * @default true
   */
  withBorder?: boolean;
  /**
   * Card padding.
   * @default lg
   */
  p?: MantineNumberSize;
  /**
   * Border radius of the card.
   * @default lg
   */
  radius?: MantineNumberSize;
  /**
   * CSS style overrides.
   * @deprecated
   */
  sx?: CSSObject;
} & CommonLayoutProps &
  CommonStylingProps;
