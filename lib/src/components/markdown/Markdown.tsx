import ReactMarkdown from "react-markdown";

import { Code } from "components/code/Code";
import { Props as CodeProps } from "components/code/Code.types";
import { ComponentErrorBoundary } from "components/errorBoundary/ComponentErrorBoundary";
import { Heading } from "components/heading/Heading";
import { Text } from "components/text/Text";

export type MarkdownProps = {
  /** The markdown content */
  children?: string;
};

export const MarkdownComponent = ({
  children: markdownChildren = "",
}: MarkdownProps) => {
  return (
    <ReactMarkdown
      components={{
        h1: (props) => <Heading level={1}>{props.children}</Heading>,
        h2: (props) => <Heading level={2}>{props.children}</Heading>,
        h3: (props) => <Heading level={3}>{props.children}</Heading>,
        h4: (props) => <Heading level={4}>{props.children}</Heading>,
        h5: (props) => <Heading level={5}>{props.children}</Heading>,
        h6: (props) => <Heading level={6}>{props.children}</Heading>,
        p: (props) => <Text>{props.children}</Text>,
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <Code language={match[1] as CodeProps["language"]} {...props}>
              {String(children)}
            </Code>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdownChildren}
    </ReactMarkdown>
  );
};

export const Markdown = (props: MarkdownProps) => (
  <ComponentErrorBoundary componentName={Markdown.displayName}>
    <MarkdownComponent {...props} />
  </ComponentErrorBoundary>
);

Markdown.displayName = "Markdown";
