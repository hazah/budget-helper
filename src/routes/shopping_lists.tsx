import React from "react";
import { json, redirect } from "react-router-dom";

import method from "method";

import ShoppingLists from "components/ShoppingLists";
import ShoppingList from "components/ShoppingList";
import ShoppingListForm from "components/ShoppingListForm";

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
  action: createShoppingList,
  children: [
    {
      index: true,
      element: <ShoppingLists />,
      id: "shopping_lists",
      loader: shoppingListsLoader,
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
          element: <ShoppingList />,
          loader: shoppingListLoader,
        },
        {
          path: "edit",
          element: <ShoppingListForm />,
          loader: shoppingListLoader,
        },
      ],
    },
  ],
};
