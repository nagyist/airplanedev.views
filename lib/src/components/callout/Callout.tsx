import { ComponentErrorBoundary } from "components/errorBoundary/ComponentErrorBoundary";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "components/icon";
import { useCommonLayoutStyle } from "components/layout/useCommonLayoutStyle";

import { useStyles } from "./Callout.styles";
import { CalloutProps, CalloutVariant } from "./Callout.types";

export const CalloutComponent = ({
  className,
  style,
  children,
  icon,
  title,
  variant = "info",
  width,
  height,
  grow,
}: CalloutProps) => {
  const { classes, cx } = useStyles({ variant });
  const { classes: layoutClasses } = useCommonLayoutStyle({
    width,
    height,
    grow,
  });
  const variantIcon = getIcon(variant);
  const renderedIcon = icon === undefined ? variantIcon : icon;
  return (
    <div
      style={style}
      className={cx(classes.root, layoutClasses.style, className)}
    >
      {renderedIcon !== null && (
        <div className={classes.icon}>{renderedIcon}</div>
      )}
      <div className={classes.body}>
        {title && <div className={classes.title}>{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
};

const getIcon = (variant: CalloutVariant) => {
  if (variant === "info") {
    return <InformationCircleIcon />;
  } else if (variant === "success") {
    return <CheckCircleIcon />;
  } else if (variant === "warning") {
    return <ExclamationTriangleIcon />;
  } else if (variant === "error") {
    return <ExclamationCircleIcon />;
  } else {
    // neutral
    return null;
  }
};

export const Callout = (props: CalloutProps) => (
  <ComponentErrorBoundary componentName={Callout.displayName}>
    <CalloutComponent {...props} />
  </ComponentErrorBoundary>
);

Callout.displayName = "Callout";
