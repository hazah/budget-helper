import React from "react";
import { EmotionCache } from "@emotion/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "routes";

import App from "components/App";

type ClientProps = {
  cache: EmotionCache;
};

export default function Client({ cache }: ClientProps) {
  return (
    <App cache={cache}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </App>
  );
}
