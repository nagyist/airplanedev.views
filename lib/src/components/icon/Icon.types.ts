import { MantineSize } from "@mantine/core";
import * as React from "react";

import type { Color } from "components/theme/colors";

export type BaseProps = {
  /**
   * Color of the icon.
   */
  color?: Color;
  /**
   * Size of the icon using predefined sizes or a number in pixels.
   * @default md
   */
  size?: MantineSize | number;
};

export type Props = BaseProps &
  Omit<JSX.IntrinsicElements["svg"], keyof BaseProps | "ref">;

export type WrapperProps = BaseProps & { children: React.ReactElement };
