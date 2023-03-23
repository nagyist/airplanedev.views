import { ComponentMeta, Story } from "@storybook/react";

import { DatePicker } from "components/datepicker/DatePicker";
import { Select } from "components/select/Select";
import { Text } from "components/text/Text";

import { Card } from "./Card";
import { CardProps } from "./Card.types";

export default {
  title: "Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: Story<CardProps> = ({ children, ...restProps }) => (
  <Card {...restProps}>{children}</Card>
);

export const Default = Template.bind({});
Default.args = {
  children: "Hello World",
};

export const WithSelect = Template.bind({});
WithSelect.args = {
  children: (
    <Select
      label="Cats"
      data={["American Wirehair", "British Shorthair", "Taby"]}
    />
  ),
};

export const WithDatePicker = Template.bind({});
WithDatePicker.args = {
  children: <DatePicker label="Date" />,
};

export const MultipleChildren = Template.bind({});
MultipleChildren.args = {
  children: (
    <>
      <Card>Child1</Card>
      <Card>Child2</Card>
    </>
  ),
};

export const Overflow = Template.bind({});
Overflow.args = {
  sx: { height: 300, overflow: "auto" },
  children: (
    <>
      {Array.from({ length: 100 }).map((_, i) => (
        <Text key={i}>Hello</Text>
      ))}
    </>
  ),
};

export const NoBorder = Template.bind({});
NoBorder.args = {
  withBorder: false,
  children: "Hello World",
};
