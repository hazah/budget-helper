import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import {
  StaticHandlerContext,
  unstable_createStaticHandler as createStaticHandler,
} from "@remix-run/router";
import { EmotionCache } from "@emotion/react";

import routes from "routes";
import Server from "components/Server";

export default async function renderServer(
  cache: EmotionCache,
  req: express.Request
): Promise<[string, StaticHandlerContext]> {
  const { query } = createStaticHandler(routes);
  const request = createFetchRequest(req);
  const context = await query(request);

  if (context instanceof Response) {
    throw context;
  }
  
  const markup = renderToString(<Server cache={cache} context={context} />);
  
  return [markup, context];
}

function createFetchHeaders(
  requestHeaders: express.Request["headers"]
): Headers {
  let headers = new Headers();

  for (let [key, values] of Object.entries(requestHeaders)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  return headers;
}

export function createFetchRequest(req: express.Request): Request {
  const origin = `${req.protocol}://${req.get("host")}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();

  req.on("close", () => {
    controller.abort();
  });

  const init: RequestInit = {
    method: req.method,
    headers: createFetchHeaders(req.headers),
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
}
