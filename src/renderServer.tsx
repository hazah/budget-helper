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
  request: Request
): Promise<[string, StaticHandlerContext]> {
  //console.debug(request);
  const { query } = createStaticHandler(routes);
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
    if (values && key) {
      //console.debug(key, values);
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

class CustomRequest extends Request {
  private readonly data: BodyInit;
  public constructor(href: RequestInfo | URL, init: RequestInit) {
    super(href, init);
    this.data = init.body;
  }

  // Because node craps its pants if you call this method
  // for some ungodly reason
  public async formData(): Promise<FormData> {
    const data = new FormData();
    const values =
      typeof this.data === "string" ? JSON.parse(this.data) : this.data;

    Object.keys(values).forEach(key => {
      data.append(key, values[key]);
    });

    return data;
  }

  public async json(): Promise<any> {
    return typeof this.data === "string" ? JSON.parse(this.data) : this.data;
  }

  public async text(): Promise<string> {
    return typeof this.data === "string"
      ? this.data
      : JSON.stringify(this.data);
  }

  public async blob(): Promise<Blob> {
    return new Blob(
      typeof this.data === "string" ? [this.data] : [JSON.stringify(this.data)]
    );
  }
}

export function createFetchRequest(req: express.Request): Request {
  const origin = `${req.protocol}://${req.get("host")}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin);

  const init: RequestInit = {
    method: req.method,
    headers: createFetchHeaders(req.headers),
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new CustomRequest(url.href, init);
}
