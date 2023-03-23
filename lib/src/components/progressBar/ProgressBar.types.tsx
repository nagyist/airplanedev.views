import { MantineNumberSize } from "@mantine/core";

import { CommonLayoutProps } from "components/layout/layout.types";
import { CommonStylingProps } from "components/styling.types";
import type { Color } from "components/theme/colors";

export type ProgressBarProps = {
  /**
   * Size of the progress bar
   * @default md
   */
  size?: MantineNumberSize;
  /**
   * Progress bar border radius. Defaults to 9999px to force a fully-circular border.
   * @default 9999
   */
  radius?: MantineNumberSize;
  /**
   * Label of the progress bar
   */
  label?: string;
} & CommonLayoutProps &
  CommonStylingProps &
  ProgressBarValueProps;

type ProgressBarValueProps =
  | {
      /**
       * Percentage of the progress bar filled.
       */
      value: number;
      /**
       * Color of the progress bar
       * @default primary
       */
      color?: Color;
      sections?: never;
    }
  | {
      value?: never;
      color?: never;
      /**
       * Sections of progress bar filled.
       */
      sections: ProgressBarSection[];
    };

type ProgressBarSection = {
  value: number;
  color: Color;
  tooltip?: React.ReactNode;
};
