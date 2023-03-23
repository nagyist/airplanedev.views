import { ComponentMeta, Story } from "@storybook/react";

import { Code } from "./Code";
import { Props } from "./Code.types";

export default {
  title: "Code",
  component: Code,
  argTypes: {
    theme: {
      type: {
        name: "enum",
        value: ["light", "dark"],
      },
    },
  },
} as ComponentMeta<typeof Code>;

const Template: Story<Props> = (args) => <Code {...args} />;

export const JS = Template.bind({});
JS.args = {
  children: `export const Default = Template.bind({});
  // Do a thing
  Default.args = {
    children: "Hello World",
    language: "typescript",
};`,
  language: "javascript",
};

export const TSX = Template.bind({});
TSX.args = {
  children: `<Prism
  {...restProps}
  classNames={{
    lineNumber: classes.lineNumber,
  }}
  getPrismTheme={(_theme, colorScheme) => codeTheme}
/>`,
  language: "tsx",
};

export const Go = Template.bind({});
Go.args = {
  children: `commitObj, err := getCommit(ctx, repo, commitHash)
if err != nil {
  // Return an error
  return nil, "nop", true, 8, err
}`,
  language: "go",
  withLineNumbers: true,
};

export const Dark = Template.bind({});
Dark.args = {
  children: `commitObj, err := getCommit(ctx, repo, commitHash)
if err != nil {
  // Return an error
  return nil, "nop", true, 8, err
}`,
  language: "go",
  withLineNumbers: true,
  theme: "dark",
};
