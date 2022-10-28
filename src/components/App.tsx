import React, { ReactNode, StrictMode, Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";

import "@fontsource/roboto";

import theme from "theme";
import ErrorBoundary from "components/ErrorBoundry";

type AppProps = {
  children: ReactNode;
  cache: EmotionCache;
};

export default function App({ children, cache }: AppProps) {
  return (
    <StrictMode>
      <ErrorBoundary>
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}
