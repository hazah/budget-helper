import React, { StrictMode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import theme from "theme";
import routes from "routes";

type ClientProps = {
  cache: EmotionCache;
};

export default function Client({ cache }: ClientProps) {
  return (
    <StrictMode>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={createBrowserRouter(routes)} />
        </ThemeProvider>
      </CacheProvider>
    </StrictMode>
  );
}
