import { ComponentMeta, Story } from "@storybook/react";

import { Markdown, MarkdownProps } from "./Markdown";

export default {
  title: "Markdown",
  component: Markdown,
} as ComponentMeta<typeof Markdown>;

const Template: Story<MarkdownProps> = (args) => (
  <Markdown>{args.children}</Markdown>
);

export const Simple = Template.bind({});
Simple.args = {
  children: "Hello, world!",
};

const headers = `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
`;
export const Headers = Template.bind({});
Headers.args = {
  children: headers,
};

const codeBlock = `
~~~js
const foo = "bar";
alert(foo);
~~~
`;
export const CodeBlock = Template.bind({});
CodeBlock.args = {
  children: codeBlock,
};
