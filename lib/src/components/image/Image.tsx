import { Image as MantineImage } from "@mantine/core";
import { forwardRef, Ref } from "react";

import { ComponentErrorBoundary } from "components/errorBoundary/ComponentErrorBoundary";

import { Props } from "./Image.types";

export const ImageWithoutRef = ({
  innerRef,
  imageHeight,
  imageWidth,
  width,
  ...restProps
}: Props & { innerRef: Ref<HTMLDivElement> }) => {
  return (
    <MantineImage
      width={imageWidth}
      height={imageHeight}
      {...restProps}
      ref={innerRef}
    />
  );
};

export const Image = forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
  return (
    <ComponentErrorBoundary componentName={Image.displayName}>
      <ImageWithoutRef {...props} innerRef={ref} />
    </ComponentErrorBoundary>
  );
});
Image.displayName = "Image";
