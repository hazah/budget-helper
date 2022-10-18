import React from "react";
import { json } from "react-router-dom";

import AvailableProducts from "components/AvailableProducts";

function availableProductsLoader() {
  return json([
    { id: 1, name: "product 1", units: 2 },
    { id: 2, name: "product 2", units: 5 },
  ]);
}

export const available_products = {
  path: "available_products",
  children: [
    {
      index: true,
      id: "available_products",
      element: <AvailableProducts />,
      loader: availableProductsLoader,
    },
  ],
};
