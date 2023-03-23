import {
  MantineProvider,
  useMantineTheme,
  createEmotionCache,
} from "@mantine/core";
import { cloneElement, forwardRef, Ref } from "react";

import { THEME } from "components/theme/theme";

import { WrapperProps as Props } from "./Icon.types";

/** IconWithoutRef is exported for documentation purposes. */
export const IconWithoutRef = ({
  innerRef,
  size = "md",
  color,
  children,
  ...props
}: Props & { innerRef: Ref<SVGSVGElement> }) => {
  const theme = useMantineTheme();

  const iconColor = color
    ? theme.fn.variant({
        variant: "filled",
        color,
      }).background
    : undefined;

  const iconSize = theme.fn.size({ size, sizes: theme.other.icon.sizes });

  return (
    <>
      {cloneElement(children, {
        color: iconColor,
        width: iconSize,
        height: iconSize,
        ref: innerRef,
        ...props,
      })}
    </>
  );
};

export const Icon = forwardRef((props: Props, ref: Ref<SVGSVGElement>) => {
  // Wrap icon in its own mantine provider. Icons are distributed as separate packages
  // so they need to be separately included in the mantine theme.
  const emotionCache = createEmotionCache({
    key: "airplane",
    container:
      document.getElementById("airplane-emotion-insertion-point") ?? undefined,
  });

  return (
    <MantineProvider
      theme={THEME}
      withGlobalStyles
      withNormalizeCSS
      emotionCache={emotionCache}
    >
      <IconWithoutRef {...props} innerRef={ref} />
    </MantineProvider>
  );
});
Icon.displayName = "Icon";
