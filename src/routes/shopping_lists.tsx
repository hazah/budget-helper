import React from "react";
import { json, redirect } from "react-router-dom";

import method from "method";

import ShoppingLists from "components/ShoppingLists";
import ShoppingList from "components/ShoppingList";
import ShoppingListForm from "components/ShoppingListForm";
import Controller from "controllers/Controller";

function shoppingListsLoader() {
  const today = new Date();
  const tomorrow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDay() + 1
  );

  return json([
    { id: 1, name: "shopping list 1", date: today },
    { id: 2, name: "shopping list 2", date: tomorrow },
  ]);
}

function createShoppingList() {
  return redirect(`/1`);
}

function shoppingListLoader() {
  const today = new Date();

  return json({ id: 1, name: "shopping list 1", date: today });
}

function updateShoppingList() {
  return shoppingListLoader();
}

function deleteShoppingList() {
  return redirect(`/`);
}

class ShoppingListsController extends Controller {
  public get title(): string {
    return "Shopping Lists";
  }
}

class ShoppingListController extends Controller {
  public get title(): string {
    return (this.data as { name: string }).name;
  }
}

export const shopping_lists = {
  path: "/*",
  action: createShoppingList,
  children: [
    {
      index: true,
      element: <ShoppingLists />,
      id: "shopping_lists",
      loader: shoppingListsLoader,
      handle: ShoppingListsController,
    },
    {
      path: "new",
      element: <ShoppingListForm />,
    },
    {
      path: ":shopping_list_id",
      action: method({
        put: updateShoppingList,
        delete: deleteShoppingList,
      }),
      children: [
        {
          index: true,
          id: "shopping_list",
          element: <ShoppingList />,
          loader: shoppingListLoader,
          handle: ShoppingListController,
        },
        {
          path: "edit",
          element: <ShoppingListForm />,
          loader: shoppingListLoader,
          handle: ShoppingListController,
        },
      ],
    },
  ],
};
