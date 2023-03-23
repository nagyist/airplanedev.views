import { MantineSize } from "@mantine/core";

import { CommonLayoutProps } from "components/layout/layout.types";
import { CommonStylingProps } from "components/styling.types";
import type { Color } from "components/theme/colors";

export type LoaderProps = {
  /**
   * Color of the loader.
   * @default primary
   */
  color?: Color;
  /**
   * Size of the loader.
   * @default md
   */
  size?: number | MantineSize;
  /**
   * Appearance of the loader.
   * @default oval
   */
  variant?: "bars" | "oval" | "dots";
} & CommonLayoutProps &
  CommonStylingProps;
