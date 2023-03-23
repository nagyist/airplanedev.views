import { TooltipProps } from "@mantine/core";
import React from "react";

import { CommonStylingProps } from "components/styling.types";
import type { Color } from "components/theme/colors";

export type Props = {
  /** The content in the tooltip itself. */
  label: React.ReactNode;

  /**
   * The target element. Interacting with this element will launch the tooltip.
   *
   * This element must be a single element that takes a ref. If you want to place
   * a tooltip on multiple elements or an element without a ref, set wrap="div".
   */
  children: React.ReactNode;

  /**
   * Color of the tooltip.
   * @default gray.8
   */
  color?: Color;

  /**
   * The tooltip position relative to the children. If not specified, the
   * position will be determined automatically.
   */
  position?: TooltipProps["position"];

  /** The tooltip width in px. */
  width?: number | "auto";

  /**
   * Whether the tooltip content should be wrapped on to the next line. If true,
   * set the `width` prop to determine where the content should wrap.
   * @default false
   */
  multiline?: boolean;

  /**
   * Wraps the children in a span or div that fits the height and width of the children.
   *
   * Use this property if you want to use a tooltip on multiple elements
   * or an element without a ref.
   */
  wrapper?: "div" | "span";

  /**
   * Whether the tooltip should be disabled.
   */
  disabled?: boolean;
} & CommonStylingProps;
