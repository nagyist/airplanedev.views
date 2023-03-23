import { CSSObject, MantineNumberSize } from "@mantine/core";
import { PrismProps } from "@mantine/prism";

import { CommonLayoutProps } from "components/layout/layout.types";
import { CommonStylingProps } from "components/styling.types";

export type Props = {
  /** The code content. */
  children: string;
  /**
   * The code language.
   */
  language: PrismProps["language"] | "mysql" | "pgsql" | "none";
  /**
   * Whether to render line numbers.
   * @default false
   */
  withLineNumbers?: boolean;
  /**
   * Border radius of the code block.
   */
  radius?: MantineNumberSize;
  /**
   * Theme of the code.
   * @default light
   */
  theme?: "dark" | "light";
  /**
   * Copy button label.
   * @default "Copy code"
   */
  copyLabel?: string;
  /**
   * If true, a button will be rendered to copy code to clipboard.
   * @default true
   */
  copy?: boolean;
  /**
   * CSS style overrides.
   * @deprecated
   */
  sx?: CSSObject;
} & CommonLayoutProps &
  CommonStylingProps;
