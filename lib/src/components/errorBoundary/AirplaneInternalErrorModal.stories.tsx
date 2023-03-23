import { ComponentMeta, Story } from "@storybook/react";
import { useState } from "react";

import {
  AirplaneInternalErrorModal,
  AirplaneInternalErrorModalProps,
} from "./ComponentAirplaneInternalErrorFallback";

export default {
  title: "AirplaneInternalErrorModal",
  component: AirplaneInternalErrorModal,
} as ComponentMeta<typeof AirplaneInternalErrorModal>;

const Template: Story<AirplaneInternalErrorModalProps> = (args) => {
  const [opened, setOpened] = useState(true);
  return (
    <AirplaneInternalErrorModal
      {...args}
      opened={opened}
      setOpened={setOpened}
    />
  );
};

export const Simple = Template.bind({});
Simple.args = {
  errorMessage: "Example error message",
  componentName: "Table",
};
