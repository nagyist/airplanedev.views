import { ComponentMeta, Story } from "@storybook/react";

import { Stack } from "components/stack/Stack";
import { Text } from "components/text/Text";

import {
  ComponentErrorState,
  ComponentErrorStateProps,
  RunErrorComponentErrorState,
} from "./ComponentErrorState";

export default {
  title: "ComponentErrorState",
  component: ComponentErrorState,
} as ComponentMeta<typeof ComponentErrorState>;

const Template: Story<ComponentErrorStateProps> = (args) => (
  <ComponentErrorState {...args} />
);

export const Simple = Template.bind({});

export const ExamplesWithStack = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const emptyFn = () => {};
  return (
    <>
      <Text>not in stack</Text>
      <ComponentErrorState componentName="Table" onClick={emptyFn} />
      <Text>in vertical stack</Text>
      <Stack>
        <ComponentErrorState componentName="Table" onClick={emptyFn} />
      </Stack>
      <Text>in horizontal stack</Text>
      <Stack direction="row">
        <ComponentErrorState componentName="Table" onClick={emptyFn} />
      </Stack>
    </>
  );
};

export const RunError = () => {
  return (
    <>
      <Text>basic</Text>
      <RunErrorComponentErrorState />
      <Text>with task slug and component name</Text>
      <RunErrorComponentErrorState
        taskSlug="list_all_users"
        componentName="Table"
      />
      <Text>in a stack</Text>
      <Stack>
        <RunErrorComponentErrorState
          taskSlug="list_all_users"
          componentName="Table"
        />
      </Stack>
    </>
  );
};
