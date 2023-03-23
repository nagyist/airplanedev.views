import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Label } from "./Text";

export default {
  title: "Label",
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  children: "Hello, world! This is some cool text for all you cool cats.",
};

export const FontWeights = () => (
  <>
    <Label weight="light">Light</Label>
    <Label weight="normal">Regular</Label>
    <Label weight="medium">Medium</Label>
    <Label weight="semibold">Semibold</Label>
    <Label weight="bold">Bold</Label>
  </>
);
