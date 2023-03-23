import { ComponentMeta, Story } from "@storybook/react";

import { Link } from "./Link";
import { Props } from "./Link.types";

export default {
  title: "Link",
  component: Link,
  args: {
    children: "Hello World",
    href: "https://www.airplane.dev",
  },
} as ComponentMeta<typeof Link>;

const Template: Story<Props> = ({ children, ...restProps }) => (
  <div>
    <Link {...restProps}>{children}</Link>
    <div>
      Some text with a link <Link {...restProps}>{children}</Link> in the middle
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {};

export const CustomText = Template.bind({});
CustomText.args = {
  color: "success",
  strikethrough: true,
  italic: true,
};
