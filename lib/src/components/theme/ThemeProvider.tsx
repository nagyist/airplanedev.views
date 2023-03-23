import { MantineProvider, createEmotionCache } from "@mantine/core";
import * as React from "react";

import { THEME } from "./theme";

const emotionCache = createEmotionCache({ key: "airplane" });
// Disable Emotion SSR warnings
// https://github.com/emotion-js/emotion/issues/1105#issuecomment-557726922
emotionCache.compat = true;

export const ThemeProvider = ({
  children,
  containerDocument = document,
}: {
  children: React.ReactNode;
  containerDocument?: Document;
}) => {
  const theme = React.useMemo(() => {
    if (containerDocument === document) return THEME;
    const themeCopy = { ...THEME };
    themeCopy.components = {
      ...themeCopy.components,
      Portal: {
        ...themeCopy.components.Portal,
        defaultProps: { target: containerDocument.body },
      },
    };
    return themeCopy;
  }, [containerDocument]);

  return (
    <MantineProvider
      theme={theme}
      withGlobalStyles
      withNormalizeCSS
      emotionCache={emotionCache}
    >
      {children}
    </MantineProvider>
  );
};
