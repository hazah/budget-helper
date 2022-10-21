import React from "react";
import { json } from "react-router-dom";

import Inventory from "components/Inventory";
import InventoryController from "controllers/InventoryController";

function availableProductsLoader() {
  return json([
    { id: 1, name: "product 1", units: 2 },
    { id: 2, name: "product 2", units: 5 },
  ]);
}

export const inventory = {
  path: "inventory",
  children: [
    {
      index: true,
      id: "inventory",
      element: <Inventory />,
      loader: availableProductsLoader,
      handle: InventoryController,
    },
  ],
};
