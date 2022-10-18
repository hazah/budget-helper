import React from "react";
import { json, redirect } from "react-router-dom";

import method from "method";

import Store from "components/Store";
import Stores from "components/Stores";
import EditStore from "components/StoreForm";

function storesLoader() {
  return json([
    { id: 1, name: "store 1" },
    { id: 2, name: "store 2" },
  ]);
}

function createStore() {
  return redirect(`/stores/1`);
}

function storeLoader() {
  return json({ id: 1, name: "store 1" });
}

function updateStore({ params }) {
  return redirect(`/stores/${params.store_id}`);
}

function deleteStore() {
  return redirect(`/stores`);
}

export const stores = {
  path: "stores",
  action: createStore,
  children: [
    {
      index: true,
      element: <Stores />,
      loader: storesLoader,
      id: "stores",
    },
    {
      path: "new",
      element: <EditStore />,
    },
    {
      path: ":store_id",
      action: method({ put: updateStore, delete: deleteStore }),
      children: [
        {
          index: true,
          element: <Store />,
          loader: storeLoader,
        },
        {
          path: "edit",
          element: <EditStore />,
          loader: storeLoader,
        },
      ],
    },
  ],
};
