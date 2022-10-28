import config from "config";
import React from "react";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);

function Links({ entrypoint }) {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css.map(asset => (
          <link key={asset} rel="stylesheet" href={asset} />
        ))
      : ""
    : "";
}

function Script({ entrypoint }) {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js.map(asset => (
          <script key={asset} src={asset} defer crossOrigin="true" />
        ))
      : ""
    : "";
}

type DocumentProps = {
  title?: string;
  styles?: string;
  children: string;
};

export default function Document({ title = "Title", children }: DocumentProps) {
  return (
    <html>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links entrypoint="client" />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        <div id="modal"></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(config)};`,
          }}
        />
        <Script entrypoint="client" />
      </body>
    </html>
  );
}
