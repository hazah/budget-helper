import React from "react";
import { json, Outlet, redirect } from "react-router-dom";

import method from "method";

import Recipes from "Recipes";
import Recipe from "Recipe";
import EditRecipe from "EditRecipe";

function recipesLoader() {
  return json([
    { id: 1, name: "recipe 1" },
    { id: 2, name: "recipe 2" },
  ]);
}

function createRecipe() {
  return redirect(`/recipes/1`);
}

function recipeLoader() {
  return json({ id: 1, name: "recipe 1" });
}

function updateRecipe({ params }) {
  return redirect(`/recipes/${params.recipe_id}`);
}

function deleteRecipe() {
  return redirect(`/recipes`);}



export const recipes = {
  path: "recipes",
  element: <Outlet />,
  children: [
    {
      index: true,
      id: "recipes",
      element: <Recipes />,
      loader: recipesLoader,
      action: createRecipe,
    },
    {
      path: "new",
      element: <EditRecipe />,
    },
    {
      path: ":recipe_id",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Recipe />,
          loader: recipeLoader,
          action: method({ put: updateRecipe, delete: deleteRecipe }),
        },
        {
          path: "edit",
          element: <EditRecipe />,
          loader: recipeLoader,
        },
      ],
    },
  ],
};
