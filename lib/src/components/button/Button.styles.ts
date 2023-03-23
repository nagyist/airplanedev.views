import { createStyles } from "@mantine/core";

import { ButtonVariant } from "components/button/Button.types";
import type { Color } from "components/theme/colors";

type StyleParams = {
  color?: Color;
  variant?: ButtonVariant;
};

export const useStyles = createStyles((theme, params: StyleParams) => {
  const focusRingColor = params.color;
  let bg = {};
  if (params.variant === "subtle") {
    bg = {
      "&:disabled": {
        backgroundColor: "transparent",
      },
    };
  }
  const focusRingRGB = theme.fn.variant({
    variant: "filled",
    color: focusRingColor,
  }).background;
  let borderColor = {};
  // Override to lighten border color for outline gray (tertiary preset) button to match web
  if (
    params.variant === "outline" &&
    (params.color === "secondary" || params.color === "gray")
  ) {
    borderColor = { borderColor: theme.colors.gray[3] };
  }

  return {
    leftAlign: { justifyContent: "start" },
    disableFocusRing: {
      "&:focus": {
        ...theme.focusRingStyles.resetStyles(theme),
      },
      "&:focus:not(:focus-visible)": {
        ...theme.focusRingStyles.resetStyles(theme),
      },
    },
    recolorRoot: {
      "&:focus": {
        ...theme.fn.focusStyles()["&:focus"],
        outline: `2px solid ${focusRingRGB}`,
      },
      "&:focus:not(:focus-visible)": {
        ...theme.fn.focusStyles()["&:focus"],
        outline: `2px solid ${focusRingRGB}`,
      },
      ...bg,
      ...borderColor,
    },
  };
});
