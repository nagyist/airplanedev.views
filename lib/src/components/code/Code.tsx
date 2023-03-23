import { createStyles } from "@mantine/core";
import { Prism, PrismProps } from "@mantine/prism";
import dracula from "prism-react-renderer/themes/dracula";
import github from "prism-react-renderer/themes/github";

import { ComponentErrorBoundary } from "components/errorBoundary/ComponentErrorBoundary";
import { useCommonLayoutStyle } from "components/layout/useCommonLayoutStyle";

import { Props } from "./Code.types";

const useStyles = createStyles((theme) => ({
  lineNumber: {
    marginRight: theme.spacing.md,
    color: theme.colors.gray[3],
  },
  copy: {
    color: theme.colors.gray[4],
  },
}));

export const CodeComponent = ({
  children,
  theme = "light",
  language,
  className,
  style,
  width,
  height,
  grow,
  copy = true,
  ...restProps
}: Props) => {
  const { classes } = useStyles();
  const { classes: layoutClasses } = useCommonLayoutStyle({
    width,
    height,
    grow,
  });
  let prismLanguage: PrismProps["language"];
  // Alias the sql variants to sql.
  if (language === "pgsql" || language === "mysql") {
    prismLanguage = "sql";
  } else if (language === "none") {
    // HACK: Prism doesn't have a "none" language. However, it won't highlight anything if
    // the language is invalid. So here we force the type to be any to pass the type-check.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prismLanguage = "none" as any;
  } else {
    prismLanguage = language;
  }
  return (
    <Prism
      className={className}
      style={style}
      colorScheme={theme}
      classNames={{
        lineNumber: classes.lineNumber,
        copy: classes.copy,
        code: layoutClasses.style,
      }}
      getPrismTheme={(_theme, colorScheme) =>
        colorScheme === "light" ? github : dracula
      }
      language={prismLanguage}
      noCopy={!copy}
      {...restProps}
    >
      {children}
    </Prism>
  );
};

export const Code = (props: Props) => (
  <ComponentErrorBoundary componentName={Code.displayName}>
    <CodeComponent {...props} />
  </ComponentErrorBoundary>
);

Code.displayName = "Code";
