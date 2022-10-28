import React from "react";
import { hydrateRoot } from "react-dom/client";

import Client from "components/Client";
import createThemeCache from "createThemeCache";
const cache = createThemeCache();
  
export default function renderClient() {
  return hydrateRoot(document.getElementById("root"), <Client cache={cache} />);
}
