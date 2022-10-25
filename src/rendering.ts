import createEmotionServer from "@emotion/server/create-instance";
import createThemeCache from "createThemeCache";
import { Helmet } from "react-helmet";
import renderServer from "renderServer";
import config from "config";

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

export async function renderApp(request: Request) {
  const cache = createThemeCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const [markup, context] = await renderServer(cache, request);
  const helmet = Helmet.renderStatic();
  const constructStyleTagsFromMarkup = (markup: string) =>
    constructStyleTagsFromChunks(extractCriticalToChunks(markup));

  const links = cssLinksFromAssets(assets, "client");
  const styles = constructStyleTagsFromMarkup(markup);
  const scripts = jsScriptTagsFromAssets(
    assets,
    "client",
    " defer crossorigin"
  );

  return { markup, context, helmet, links, styles, scripts };
}

export function renderDocument({
  markup,
  helmet,
  links,
  styles,
  scripts,
}) {
  // prettier-ignore
  return `<!doctype html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      ${helmet.title.toString()}
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${helmet.meta.toString()}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      ${links}
      ${helmet.link.toString()}
      ${helmet.style.toString()}
      ${styles}
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      <div id="root">${markup}</div>
      <div id="modal"></div>
      <script>window.env = ${JSON.stringify(config)};</script>
      ${scripts}
      ${helmet.script.toString()}
    </body>
  </html>`;
}
