import {
  Divider as MantineDivider,
  DividerProps as MantineDividerProps,
} from "@mantine/core";

import { ComponentErrorBoundary } from "components/errorBoundary/ComponentErrorBoundary";
import { CommonLayoutProps } from "components/layout/layout.types";
import { useCommonLayoutStyle } from "components/layout/useCommonLayoutStyle";
import { CommonStylingProps } from "components/styling.types";
import { Color } from "components/theme/colors";

export type DividerProps = Omit<MantineDividerProps, "color"> & {
  /**
   * Color of the divider.
   * @default gray.2
   */
  color?: Color;
} & CommonLayoutProps &
  CommonStylingProps;

export const DividerComponent = ({
  color = "gray.2",
  className,
  style,
  width,
  height,
  grow,
  ...props
}: DividerProps) => {
  const { classes: layoutClasses, cx } = useCommonLayoutStyle({
    width,
    height,
    grow,
  });
  return (
    <MantineDivider
      color={color}
      className={cx(layoutClasses.style, className)}
      style={style}
      {...props}
    />
  );
};

export const Divider = (props: DividerProps) => (
  <ComponentErrorBoundary componentName={Divider.componentName}>
    <DividerComponent {...props} />
  </ComponentErrorBoundary>
);

Divider.componentName = "Divider";
