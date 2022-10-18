import React, { StrictMode } from "react";
import { v4 as uuid } from "uuid";
import {
  unstable_StaticRouterProvider as StaticRouterProvider,
  unstable_createStaticRouter as createStaticRouter,
  StaticRouterProviderProps,
} from "react-router-dom/server";
import { EmotionCache } from "@emotion/react";

import routes from "routes";
import App from "components/App";

type ServerProps = {
  cache: EmotionCache;
  context: StaticRouterProviderProps["context"];
};

export default function Server({ cache, context }: ServerProps) {
  return (
    <App cache={cache}>
      <StaticRouterProvider
        router={createStaticRouter(routes, context)}
        context={context}
        nonce={uuid()}
      />
    </App>
  );
}
