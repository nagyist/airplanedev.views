import { Loader as MantineLoader } from "@mantine/core";

import { ComponentErrorBoundary } from "components/errorBoundary/ComponentErrorBoundary";

import { LoaderProps } from "./Loader.types";

export const LoaderComponent = ({
  color = "primary",
  size = "md",
  variant = "oval",
  className,
  style,
}: LoaderProps) => (
  <MantineLoader
    className={className}
    style={style}
    color={color}
    size={size}
    variant={variant}
  />
);

export const Loader = (props: LoaderProps) => (
  <ComponentErrorBoundary componentName={Loader.displayName}>
    <LoaderComponent {...props} />
  </ComponentErrorBoundary>
);

Loader.displayName = "Loader";
