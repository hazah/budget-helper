import React from "react";
import { json, Outlet } from "react-router-dom";

import AvailableProducts from "AvailableProducts";

function availableProductsLoader() {
  return json([
    { id: 1, name: "product 1", units: 2 },
    { id: 2, name: "product 2", units: 5 },
  ]);
}

export const available_products = {
  path: "available_products",
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <AvailableProducts />,
      loader: availableProductsLoader,
    },
  ],
};
