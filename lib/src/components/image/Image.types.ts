import { MantineSize } from "@mantine/core";
import React from "react";

import { CommonLayoutProps } from "components/layout/layout.types";
import { CommonStylingProps } from "components/styling.types";

export type Props = {
  /** Image source URL. */
  src: string;
  /**
   * Image width.
   * @default 100%
   */
  imageWidth?: string | number;
  /**
   * Image height.
   * @default original image height
   */
  imageHeight?: string | number;
  /** Alternate text for an image for accessibility purposes. */
  alt?: string;
  /** Radius of the image. */
  radius?: MantineSize;
  /** Caption underneath the image. */
  caption?: React.ReactNode;
  /**
   * The image object-fit property. Useful if you manually set the image width/height.
   *
   * cover: The image will completely fill the container, potentially becoming cropped if it is too large.
   * contain: The image will never be cropped. If the container is smaller than the image, it will not fill the container.
   *
   * @default cover
   */
  fit?: "contain" | "cover";
} & CommonLayoutProps &
  CommonStylingProps;
