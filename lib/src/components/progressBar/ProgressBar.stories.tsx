import { ComponentMeta, Story } from "@storybook/react";

import { ProgressBar } from "./ProgressBar";
import { ProgressBarProps } from "./ProgressBar.types";

export default {
  title: "ProgressBar",
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const Template: Story<ProgressBarProps> = (args) => <ProgressBar {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  size: "xl",
  value: 40,
  label: "Progress bar",
};

export const Sections = Template.bind({});
Sections.args = {
  sections: [
    {
      value: 25,
      color: "primary",
    },
    {
      value: 25,
      color: "green",
    },
  ],
};
