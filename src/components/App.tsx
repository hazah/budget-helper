import React, { ReactNode, StrictMode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";

import theme from "theme";
//import "@fontsource/roboto";

type AppProps = {
  children: ReactNode;
  cache: EmotionCache;
};

export default function App({ children, cache }: AppProps) {
  return (
    <StrictMode>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </StrictMode>
  );
}
