import { ComponentMeta, Story } from "@storybook/react";

import { DateTimePickerProps } from "./DatePicker.types";
import { DateTimePicker } from "./DateTimePicker";

export default {
  title: "DateTimePicker",
  component: DateTimePicker,
} as ComponentMeta<typeof DateTimePicker>;

const Template: Story<DateTimePickerProps> = (args) => (
  <DateTimePicker {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  description: "Description",
  placeholder: "Placeholder",
  clearable: true,
};
