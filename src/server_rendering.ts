import express from "express";
import createEmotionServer from "@emotion/server/create-instance";
import createThemeCache from "createThemeCache";
import { Helmet } from "react-helmet";
import renderServer from "renderServer";

type Assets = {
  [entrypoint: string]: { js: string[]; css: string[] };
};

let assets: any;

function syncLoadAssets() {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
}
syncLoadAssets();

function cssLinksFromAssets(assets: Assets, entrypoint: string) {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css
          .map(asset => `<link rel="stylesheet" href="${asset}">`)
          .join("")
      : ""
    : "";
}

function jsScriptTagsFromAssets(
  assets: Assets,
  entrypoint: string,
  extra = ""
) {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js
          .map(asset => `<script src="${asset}"${extra}></script>`)
          .join("")
      : ""
    : "";
}

export async function renderApp(req: express.Request) {
  const cache = createThemeCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const [markup, context] = await renderServer(cache, req);
  const helmet = Helmet.renderStatic();
  const constructStyleTagsFromMarkup = (markup: string) =>
    constructStyleTagsFromChunks(extractCriticalToChunks(markup));

  const html =
    // prettier-ignore
    `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    ${helmet.title.toString()}
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${helmet.meta.toString()}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    ${cssLinksFromAssets(assets, "client")}
    ${helmet.link.toString()}
    ${helmet.style.toString()}
    ${constructStyleTagsFromMarkup(markup)}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <div id="root">${markup}</div>
    <div id="modal"></div>
    ${jsScriptTagsFromAssets(assets, "client", " defer crossorigin")}
    ${helmet.script.toString()}
  </body>
</html>`;

  return { html, context };
}

export async function render(
  path: string,
  options: { req: express.Request; res: express.Response },
  callback: (err: Error, result?: string) => unknown
) {
  try {
    const { req, res } = options;
    const fragments = path.split("/");
    const filename = fragments[fragments.length - 1];
    const template = filename.split(".")[0];

    if (template === "app") {
      const { renderApp: renderFunction } = await import("app");
      const { html = "", context } = await renderFunction(req);

      res.status(context.statusCode);

      return callback(null, html);
    }

    return callback(new Error("Unknown template ${template}"));
  } catch (err) {
    return callback(err);
  }
}
