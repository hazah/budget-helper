import React from "react";
import { json, redirect } from "react-router-dom";

import method from "method";

import Recipes from "components/Recipes";
import Recipe from "components/Recipe";
import EditRecipe from "components/EditRecipe";

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
  action: createRecipe,
  children: [
    {
      index: true,
      id: "recipes",
      element: <Recipes />,
      loader: recipesLoader,
    },
    {
      path: "new",
      element: <EditRecipe />,
    },
    {
      path: ":recipe_id",
      action: method({ put: updateRecipe, delete: deleteRecipe }),
      children: [
        {
          index: true,
          element: <Recipe />,
          loader: recipeLoader,
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
