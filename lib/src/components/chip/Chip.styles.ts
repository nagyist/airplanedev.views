import { createStyles, MantineTheme } from "@mantine/core";

import { ChipProps } from "./Chip.types";

type StyleParams = {
  color: NonNullable<ChipProps["color"]>;
  size: NonNullable<ChipProps["size"]>;
  variant: NonNullable<ChipProps["variant"]>;
};

export const useStyles = createStyles((theme, params: StyleParams) => {
  return {
    root: {
      ...getVariantStyles(theme, params),
      ...getColorStyles(theme, params),
    },
  };
});

const getVariantStyles = (theme: MantineTheme, params: StyleParams) => {
  let backgroundColor;
  let color;
  let borderColor;
  if (params.variant === "light") {
    backgroundColor = theme.colors[params.color][0];
    color = theme.colors[params.color][6];
    borderColor = backgroundColor;
  } else if (params.variant === "filled") {
    backgroundColor = theme.colors[params.color][6];
    color = theme.colors[params.color][0];
    borderColor = backgroundColor;
  } else {
    backgroundColor = theme.white;
    color = theme.colors[params.color][6];
    borderColor = color;
  }
  return { backgroundColor, color, border: `1px solid ${borderColor}` };
};

const getColorStyles = (theme: MantineTheme, params: StyleParams) => {
  let fontSize;
  let padding;
  if (params.size === "sm") {
    fontSize = theme.fontSizes.xs;
    padding = "2px 8px";
  } else if (params.size === "md") {
    fontSize = theme.fontSizes.sm;
    padding = "4px 14px";
  } else {
    fontSize = theme.fontSizes.md;
    padding = "4px 16px";
  }
  return {
    fontFamily: theme.fontFamily,
    fontWeight: 500,
    fontSize,
    borderRadius: theme.radius.xl,
    padding,
  };
};
