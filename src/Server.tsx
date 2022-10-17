import React, { StrictMode } from "react";
import { v4 as uuid } from "uuid";
import {
  unstable_StaticRouterProvider as StaticRouterProvider,
  unstable_createStaticRouter as createStaticRouter,
  StaticRouterProviderProps,
} from "react-router-dom/server";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";

import theme from "theme";
import routes from "routes";

type ServerProps = {
  cache: EmotionCache;
  context: StaticRouterProviderProps["context"];
};

export default function Server({ cache, context }: ServerProps) {
  return (
    <StrictMode>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StaticRouterProvider
            router={createStaticRouter(routes, context)}
            context={context}
            nonce={uuid()}
          />
        </ThemeProvider>
      </CacheProvider>
    </StrictMode>
  );
}
