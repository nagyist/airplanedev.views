import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button } from "components/button/Button";
import { TextInputState, useComponentState } from "state";

import { TextInput } from "./TextInput";

export default {
  title: "Text Input",
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  placeholder: "Placeholder",
  description: "Description",
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

export const Append = () => {
  const inputState = useComponentState<TextInputState>("myTextInput");
  return (
    <>
      <Button onClick={() => inputState.setValue(inputState.value! + "a")}>
        Append
      </Button>
      <TextInput id="myTextInput" defaultValue="a" />
    </>
  );
};
