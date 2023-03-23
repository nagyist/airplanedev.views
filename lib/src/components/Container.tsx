import {
  Container as MantineContainer,
  ContainerProps as MantineContainerProps,
} from "@mantine/core";

export type ContainerProps = MantineContainerProps;

export const Container = (props: ContainerProps) => (
  <MantineContainer {...props} />
);
