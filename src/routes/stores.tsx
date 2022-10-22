import React from "react";

import method from "method";

import Store from "components/Store";
import Stores from "components/Stores";
import EditStore from "components/StoreForm";
import StoresController from "controllers/StoresController";
import {
  createStore,
  getStores,
  updateStore,
  deleteStore,
  getStore,
} from "api/stores";

export const stores = {
  path: "stores",
  action: createStore,
  children: [
    {
      index: true,
      element: <Stores />,
      loader: getStores,
      id: "stores",
      handle: StoresController,
    },
    {
      path: "new",
      element: <EditStore />,
      handle: StoresController,
    },
    {
      path: ":store_id",
      action: method({ put: updateStore, delete: deleteStore }),
      children: [
        {
          index: true,
          element: <Store />,
          loader: getStore,
          handle: StoresController,
        },
        {
          path: "edit",
          element: <EditStore />,
          loader: getStore,
          handle: StoresController,
        },
      ],
    },
  ],
};
