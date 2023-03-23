import { ComponentMeta, Story } from "@storybook/react";

import { Button } from "components/button/Button";
import { Heading } from "components/heading/Heading";
import { Stack } from "components/stack/Stack";
import { Text } from "components/text/Text";

import { Dialog } from "./Dialog";
import { Props } from "./Dialog.types";

export default {
  title: "Dialog",
  component: Dialog,
  args: {
    children: (
      <Stack>
        <Heading>Dialog content</Heading>
        <Text>I am in a dialog</Text>
        <Button>Button in a dialog</Button>
      </Stack>
    ),
    opened: true,
  },
  argTypes: { onClose: { action: "close" } },
} as ComponentMeta<typeof Dialog>;

const Template: Story<Props> = (args) => (
  <div>
    <div>Stuff in the background</div>
    <Dialog {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: "Dialog title",
};
