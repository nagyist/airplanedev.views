import { Container, Stack, ViewProvider } from "@airplane/views";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ViewProvider
      queryClientConfig={{
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      }}
    >
      <Container size="xl" py={96}>
        <Stack direction="column">
          <App />
        </Stack>
      </Container>
    </ViewProvider>
  </StrictMode>
);
