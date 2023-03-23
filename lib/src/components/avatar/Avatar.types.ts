import { MantineNumberSize } from "@mantine/styles";
import React from "react";

import { CommonStylingProps } from "components/styling.types";
import type { Color } from "components/theme/colors";

export type AvatarProps = {
  /**
   * Avatar border radius. Defaults to 9999px to force a fully-circular border.
   * @default 9999
   */
  radius?: MantineNumberSize;
  /**
   * Avatar size.
   * @default md
   */
  size?: MantineNumberSize;
  /**
   * Avatar color. Applies if image source is not set.
   * @default primary
   */
  color?: Color;
  /**
   * Custom placeholder to be placed inside the avatar, often a 1 to 2 character string.
   */
  children?: React.ReactNode;
  /**
   * Source for image.
   */
  src?: string;
  /**
   * User email for Airplane account. If set, renders avatar based on Airplane account
   * details. If both email and userID are set, email takes precedence.
   */
  email?: string;
  /**
   * User ID for Airplane account. If set, renders avatar based on Airplane account details.
   */
  userID?: string;
} & CommonStylingProps;
