import React from "react";
import { json, Outlet, redirect } from "react-router-dom";

import method from "method";

import Store from "Store";
import Stores from "Stores";
import EditStore from "EditStore";

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
  return redirect(`/stoers/${params.store_id}`);
}

function deleteStore() {
  return redirect(`/stores`);
}

export const stores = {
  path: "stores",
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Stores />,
      loader: storesLoader,
      action: createStore,
      id: "stores",
    },
    {
      path: "new",
      element: <EditStore />,
    },
    {
      path: ":store_id",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Store />,
          loader: storeLoader,
          action: method({ put: updateStore, delete: deleteStore }),
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
