import React from "react";

import { ComponentErrorBoundary } from "components/errorBoundary/ComponentErrorBoundary";

import { useStyles } from "./Chip.styles";
import { ChipColor, ChipProps } from "./Chip.types";

export const ChipComponent = ({
  children,
  color = "primary",
  size = "md",
  variant = "light",
  className,
  style,
}: ChipProps) => {
  if (color === "auto") {
    color = pickColor(children);
  }
  const { classes, cx } = useStyles({
    color,
    size,
    variant,
  });
  return (
    <span style={style} className={cx(classes.root, className)}>
      {children}
    </span>
  );
};

const AUTO_COLOR_CHOICES: ChipProps["color"][] = [
  "gray",
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "orange",
];

const pickColor = (children: React.ReactNode): ChipColor => {
  let color;
  if (typeof children === "string") {
    color = AUTO_COLOR_CHOICES[hashStr(children) % AUTO_COLOR_CHOICES.length];
  } else if (typeof children === "number") {
    color = AUTO_COLOR_CHOICES[children % AUTO_COLOR_CHOICES.length];
  }
  return color || "primary";
};

const hashStr = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }
  return hash;
};

export const Chip = (props: ChipProps) => (
  <ComponentErrorBoundary componentName={Chip.displayName}>
    <ChipComponent {...props} />
  </ComponentErrorBoundary>
);

Chip.displayName = "Chip";
