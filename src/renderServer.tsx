import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import {
  StaticHandlerContext,
  unstable_createStaticHandler as createStaticHandler,
} from "@remix-run/router";
import createEmotionServer from "@emotion/server/create-instance";
import createThemeCache from "createThemeCache";

import { EmotionCache } from "@emotion/react";

import routes from "routes";
import Server from "components/Server";
import Document from "components/Document";

type User = {
  name: string;
};

export async function renderAuth(
  request: Request
): Promise<{ contextOrData: User | StaticHandlerContext; document?: string }> {
  switch (request.headers.get("accept")) {
    case "application/json":
      const { queryRoute } = createStaticHandler(routes);
      const data = await queryRoute(request);

      if (data instanceof Response) {
        throw data;
      }

      return { contextOrData: data };
    default:
      const { query } = createStaticHandler(routes);
      const context = await query(request);

      if (context instanceof Response) {
        throw context;
      }

      const cache = createThemeCache();
      const { renderStylesToString } = createEmotionServer(cache);

      const markup = renderToString(<Server cache={cache} context={context} />);

      const document = renderToString(
        <Document>{renderStylesToString(markup)}</Document>
      );

      return { contextOrData: context, document: document };
  }
}

export async function renderDocument(request: Request) {
  const { query } = createStaticHandler(routes);
  const context = await query(request);

  if (context instanceof Response) {
    throw context;
  }

  const cache = createThemeCache();
  const { renderStylesToString } = createEmotionServer(cache);

  const markup = renderToString(<Server cache={cache} context={context} />);

  const document = renderToString(
    <Document>{renderStylesToString(markup)}</Document>
  );

  return new Response(document, {
    status: request.method === "POST" ? 201 : 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

export async function renderData(request: Request) {
  const { queryRoute } = createStaticHandler(routes);
  const data = await queryRoute(request);

  if (data instanceof Response) {
    return data;
  }

  return new Response(JSON.stringify(data), {
    status: request.method === "POST" ? 201 : 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
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
