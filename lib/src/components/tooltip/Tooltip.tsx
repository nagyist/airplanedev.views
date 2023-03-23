import { Tooltip as MantineTooltip } from "@mantine/core";
import { Fragment, createElement } from "react";

import { ComponentErrorBoundary } from "components/errorBoundary/ComponentErrorBoundary";

import { Props } from "./Tooltip.types";

export const TooltipComponent = ({
  color = "gray.8",
  children,
  wrapper,
  ...restProps
}: Props) => {
  if (!wrapper) {
    if (
      typeof children === "string" ||
      typeof children === "number" ||
      (typeof children === "object" &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (children as any)?.type === Fragment)
    ) {
      wrapper = "span";
    }
  }
  return (
    <MantineTooltip color={color} withinPortal {...restProps}>
      {wrapper ? createElement(wrapper, {}, children) : children}
    </MantineTooltip>
  );
};

export const Tooltip = (props: Props) => (
  <ComponentErrorBoundary componentName={Tooltip.displayName}>
    <TooltipComponent {...props} />
  </ComponentErrorBoundary>
);
Tooltip.displayName = "Tooltip";
