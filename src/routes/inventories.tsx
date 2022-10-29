import React from "react";

import Inventories from "components/Inventories";
import InventoriesController from "controllers/InventoriesController";
import {
  createInventory,
  deleteInventory,
  getInventories,
  getInventory,
  updateInventory,
} from "api/inventories";
import InventoryForm from "components/InventoryForm";
import method from "method";
import Inventory from "components/Inventory";

export const inventories = {
  path: "inventories",
  action: createInventory,
  children: [
    {
      index: true,
      id: "inventories",
      element: <Inventories />,
      loader: getInventories,
      handle: InventoriesController,
    },
    {
      path: "new",
      element: <InventoryForm />,
      handle: InventoriesController,
    },
    {
      path: ":inventory_id",
      id: "inventory",
      action: method({ put: updateInventory, delete: deleteInventory }),
      children: [
        {
          index: true,
          element: <Inventory />,
          loader: getInventory,
          handle: InventoriesController,
        },
        {
          path: "edit",
          element: <InventoryForm />,
          loader: getInventory,
          handle: InventoriesController,
        },
      ],
    },
  ],
};
