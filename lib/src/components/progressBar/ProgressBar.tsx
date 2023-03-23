import {
  Input as MantineInput,
  Progress as MantineProgress,
} from "@mantine/core";

import { ComponentErrorBoundary } from "components/errorBoundary/ComponentErrorBoundary";
import { useCommonLayoutStyle } from "components/layout/useCommonLayoutStyle";

import type { ProgressBarProps } from "./ProgressBar.types";

export const ProgressBarComponent = ({
  color = "primary",
  size = "md",
  radius = 9999,
  label,
  className,
  style,
  width,
  height,
  grow,
  ...otherProps
}: ProgressBarProps) => {
  const { classes: layoutClasses, cx } = useCommonLayoutStyle({
    width,
    height,
    grow,
  });
  return (
    <MantineInput.Wrapper
      id="progressBar"
      className={cx(layoutClasses.style, className)}
      style={style}
      label={label}
    >
      <MantineProgress
        color={color}
        size={size}
        radius={radius}
        {...otherProps}
      />
    </MantineInput.Wrapper>
  );
};

export const ProgressBar = (props: ProgressBarProps) => (
  <ComponentErrorBoundary componentName={ProgressBar.displayName}>
    <ProgressBarComponent {...props} />
  </ComponentErrorBoundary>
);

ProgressBar.displayName = "ProgressBar";
