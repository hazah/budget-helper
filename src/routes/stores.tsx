import React from "react";
import { json, redirect } from "react-router-dom";

import method from "method";

import Store from "components/Store";
import Stores from "components/Stores";
import EditStore from "components/StoreForm";
import Controller from "controllers/Controller";

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

class StoresController extends Controller {
  public get title(): string {
    return "Stores";
  }
}

class StoreController extends Controller {
  public get title(): string {
    return (this.data as { name: string }).name;
  }
}

class NewStoreController extends Controller {
  public get title(): string {
    return "New Store";
  }
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
      handle: StoresController,
    },
    {
      path: "new",
      element: <EditStore />,
      handle: NewStoreController,
    },
    {
      path: ":store_id",
      action: method({ put: updateStore, delete: deleteStore }),
      children: [
        {
          index: true,
          element: <Store />,
          loader: storeLoader,
          handle: StoreController,
        },
        {
          path: "edit",
          element: <EditStore />,
          loader: storeLoader,
          handle: StoreController,
        },
      ],
    },
  ],
};
