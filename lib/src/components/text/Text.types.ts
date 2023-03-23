import { CSSObject, MantineSize } from "@mantine/core";
import React from "react";

import { CommonLayoutProps } from "components/layout/layout.types";
import { CommonStylingProps } from "components/styling.types";
import { Color } from "components/theme/colors";
import { FontWeight } from "components/theme/typography";

export type TextPropsBase = {
  /**
   * Disables automatic markdown parsing
   */
  disableMarkdown?: boolean;
} & RawTextPropsBase;

export type RawTextPropsBase = {
  /**
   * Text content.
   */
  children: React.ReactNode;
  /**
   * Text size.
   * @default md
   */
  size?: MantineSize;
  /**
   * Text color
   */
  color?: Color;
  /**
   * The maximum number of lines to clamp to. If set, only this number of lines
   * will be shown, and the text will appear truncated with a trailing ellipsis.
   */
  lineClamp?: number;
  /** Controls the font weight. */
  weight?: FontWeight;
  /**
   * Sets text-transform css property.
   * @deprecated - Style using `className` or `style` props instead.
   */
  transform?: React.CSSProperties["textTransform"];
  /**
   * Sets text-align css property.
   * @deprecated - Style using `className` or `style` props instead.
   */
  align?: React.CSSProperties["textAlign"];
  /**
   * Adds font-style: italic
   */
  italic?: boolean;
  /**
   * Underline the text
   */
  underline?: boolean;
  /**
   * Add strikethrough style
   */
  strikethrough?: boolean;
  /**
   * CSS style overrides
   * @deprecated
   */
  sx?: CSSObject;
} & CommonLayoutProps &
  CommonStylingProps;

export type TextProps = TextPropsBase &
  Omit<JSX.IntrinsicElements["div"], keyof TextPropsBase | "ref">;

export type LabelProps = RawTextPropsBase &
  Omit<JSX.IntrinsicElements["div"], keyof RawTextPropsBase | "ref">;
