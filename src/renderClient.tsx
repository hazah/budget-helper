import React from "react";
import { hydrate } from "react-dom";
import { EmotionCache } from "@emotion/react";

import Client from "components/Client";

export default function renderClient(cache: EmotionCache) {
  hydrate(<Client cache={cache} />, document.getElementById("root"));
}
