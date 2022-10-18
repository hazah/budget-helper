import React from "react";
import { json, Outlet, redirect } from "react-router-dom";

import method from "method";

import ShoppingLists from "ShoppingLists";
import ShoppingList from "ShoppingList";
import EditShoppingList from "EditShoppingList";

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

function updateShoppingList({ params }) {
  return redirect(`/${params.shopping_list_id}`);
}

function deleteShoppingList() {
  return redirect(`/`);
}

export const shopping_lists = {
  path: "/",
  element: <Outlet />,
  action: createShoppingList,
  children: [
    {
      index: true,
      element: <ShoppingLists />,
      loader: shoppingListsLoader,
      action: createShoppingList,
      id: "shopping_lists" ,
    },
    {
      path: "new",
      element: <EditShoppingList />,
    },
    {
      path: ":shopping_list_id",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <ShoppingList />,
          loader: shoppingListLoader,
          action: method({
            put: updateShoppingList,
            delete: deleteShoppingList,
          }),
        },
        {
          path: "edit",
          element: <EditShoppingList />,
          loader: shoppingListLoader,
        },
      ],
    },
  ],
};
