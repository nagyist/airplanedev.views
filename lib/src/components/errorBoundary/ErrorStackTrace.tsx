import { ErrorInfo } from "react";

import { CodeComponent } from "components/code/Code";
import { HeadingComponent } from "components/heading/Heading";
import { StackComponent } from "components/stack/Stack";

export type ErrorStackTraceProps = {
  error: Error;
  errorInfo: ErrorInfo;
};

export const ErrorStackTrace = ({ error, errorInfo }: ErrorStackTraceProps) => {
  return (
    <StackComponent>
      <CodeComponent language="none" copyLabel="Copy error">
        {error.message}
      </CodeComponent>
      {error.stack && (
        <StackComponent spacing="sm">
          <HeadingComponent level={5}>Stack trace</HeadingComponent>
          <CodeComponent language="none" copyLabel="Copy stack trace">
            {error.stack}
          </CodeComponent>
        </StackComponent>
      )}
      {errorInfo.componentStack && (
        <StackComponent spacing="sm">
          <HeadingComponent level={5}>Component stack trace</HeadingComponent>
          <CodeComponent language="none" copyLabel="Copy stack trace">
            {errorInfo.componentStack}
          </CodeComponent>
        </StackComponent>
      )}
    </StackComponent>
  );
};
