import {
  Skeleton as MantineSkeleton,
  SkeletonProps as MantineSkeletonProps,
} from "@mantine/core";

export type SkeletonProps = MantineSkeletonProps;

export const Skeleton = (props: SkeletonProps) => (
  <MantineSkeleton {...props} />
);
