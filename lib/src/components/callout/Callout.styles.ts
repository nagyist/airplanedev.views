import { createStyles, MantineTheme } from "@mantine/core";
import { CSSProperties } from "react";

import { CalloutVariant } from "./Callout.types";

type StyleParams = {
  variant: CalloutVariant;
};

export const useStyles = createStyles((theme, params: StyleParams) => {
  const { backgroundColor, color } = getColors(theme, params);
  return {
    root: {
      backgroundColor,
      padding: theme.spacing.md,
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSizes.sm,
      lineHeight: "1.5em",
      borderRadius: theme.radius.sm,
      display: "flex",
      gap: 12,
    },
    icon: {
      color,
      marginTop: 2,
      flex: "0 0 auto",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      color: theme.colors.dark[7],
    },
    title: {
      color,
      fontWeight: 600,
    },
  };
});

const getColors = (theme: MantineTheme, { variant }: StyleParams) => {
  const variantMapping: Record<
    CalloutVariant,
    {
      backgroundColor: CSSProperties["backgroundColor"];
      color: CSSProperties["color"];
    }
  > = {
    info: {
      backgroundColor: theme.colors.blue[0],
      color: theme.colors.blue[6],
    },
    success: {
      backgroundColor: theme.colors.success[0],
      color: theme.colors.success[6],
    },
    warning: {
      backgroundColor: theme.colors.yellow[0],
      color: theme.colors.yellow[6],
    },
    error: {
      backgroundColor: theme.colors.error[0],
      color: theme.colors.error[6],
    },
    neutral: {
      backgroundColor: theme.colors.gray[0],
      color: theme.colors.gray[6],
    },
  };
  return variantMapping[variant];
};
