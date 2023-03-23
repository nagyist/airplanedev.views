import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Textarea } from "./Textarea";

export default {
  title: "Text Area",
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => (
  <Textarea {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  placeholder: "Placeholder",
  description: "Description",
  minRows: 5,
};

export const WithError = Template.bind({});
WithError.args = {
  error: "Error!!!",
  defaultValue: "My bad value",
};

export const Disabled = Template.bind({});
Disabled.args = {
  defaultDisabled: true,
};

export const Autosize = Template.bind({});
Autosize.args = {
  autosize: true,
  maxRows: 3,
  placeholder: "multi-\nline\nstring",
};
