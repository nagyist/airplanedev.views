import { ComponentMeta, Story } from "@storybook/react";

import { ErrorBoundary, Props } from "./ErrorBoundary";

export default {
  title: "ErrorBoundary",
  component: ErrorBoundary,
} as ComponentMeta<typeof ErrorBoundary>;

const Template: Story<Props> = (args) => (
  <ErrorBoundary {...args}>
    <ErrorC />
  </ErrorBoundary>
);

export const Simple = Template.bind({});
Simple.parameters = {
  chromatic: { disableSnapshot: true },
};

const Fallback = () => {
  return <div>something went wrong</div>;
};
export const CustomFallback = Template.bind({});
CustomFallback.args = {
  fallback: <Fallback />,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ErrorC = ({ no }: any) => {
  if (no.no) {
    return null;
  }
  return null;
};
