import React from "react";

import Inventory from "components/Inventory";
import InventoryController from "controllers/InventoryController";
import { getInventory } from "api/inventory";

export const inventory = {
  path: "inventory",
  children: [
    {
      index: true,
      id: "inventory",
      element: <Inventory />,
      loader: getInventory,
      handle: InventoryController,
    },
  ],
};
