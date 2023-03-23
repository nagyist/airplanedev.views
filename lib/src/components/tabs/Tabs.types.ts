import React from "react";

import { CommonLayoutProps } from "components/layout/layout.types";
import { CommonStylingProps } from "components/styling.types";
import type { Color } from "components/theme/colors";
import { TabsValue } from "state/components/tabs/state";

export type TabsPlacement = "top" | "bottom" | "left" | "right";
export type TabsPosition = "start" | "end" | "center" | "apart";

export type TabsComponentProps = {
  /**
   * Accent color of the active tab.
   */
  color?: Color;
  /**
   * How list of tabs is placed relative to the content.
   * If top or bottom, tabs will be oriented horizontally.
   * If left or right, tabs will be oriented vertically.
   * @default top
   */
  placement?: TabsPlacement;
  /**
   * How tabs are positioned along the main axis.
   * @default start
   */
  position?: TabsPosition;
  /**
   * Whether tabs should take the whole space.
   * @default false
   */
  grow?: boolean;
  /**
   * Tab content. Expecting Tabs.Tab components.
   */
  children: React.ReactNode;
  /**
   * If false, content of the tabs will not stay mounted when tab is inactive.
   * @default true
   */
  keepMounted?: boolean;
  /**
   * Callback when the value of the active tab changes when using as a controlled component. Prefer
   * using the global component state.
   */
  onTabChange?: (value: string) => void;
  /**
   * Value of the active tab if using this component as a controlled component.
   * Prefer to use the component state to get the value.
   */
  value?: TabsValue;
} & CommonLayoutProps &
  CommonStylingProps;

export type TabsProps = {
  /**
   * The ID referenced by the global component state.
   */
  id?: string;
  /**
   * The tabs value on initial render.
   *
   * @default null
   */
  defaultValue?: TabsValue;
  /**
   * If true, the tabs will save the active tab in the URL.
   *
   * @default true
   */
  enableRouting?: boolean;
  /**
   * URL param key for saving the active tab in the URL.
   *
   * Set to null to disable routing for this Tabs component.
   *
   * @default null
   */
  routingKey?: string | null;
} & TabsComponentProps;

export type TabProps = {
  /**
   * Adds an icon to the left of the tab label.
   */
  icon?: React.ReactNode;
  /**
   * Content of the label for the tab.
   * @default value
   */
  label?: React.ReactNode;
  /**
   * Identifier for the tab. Used by Tabs parent component when determining the active tab.
   */
  value: string;
  /**
   * Content of the tab panel.
   */
  children?: React.ReactNode;
  /**
   * If true, tab is disabled.
   */
  disabled?: boolean;
  /**
   * Accent color of the tab. Will override the color from the Tabs parent component if set.
   */
  color?: Color;
};
