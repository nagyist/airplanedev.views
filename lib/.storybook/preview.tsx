import { ViewProvider } from "../src/provider";
import { setEnvVars } from "../src/client/env";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    setEnvVars("http://api", "", "", "prod");
    return (
      <ViewProvider>
        <Story />
      </ViewProvider>
    );
  },
];
