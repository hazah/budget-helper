import React from "react";

import method from "method";

import Recipes from "components/Recipes";
import Recipe from "components/Recipe";
import RecipeForm from "components/RecipeForm";
import RecipesController from "controllers/RecipesController";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
} from "api/recipes";

export const recipes = {
  path: "recipes",
  action: createRecipe,
  children: [
    {
      index: true,
      id: "recipes",
      element: <Recipes />,
      loader: getRecipes,
      handle: RecipesController,
    },
    {
      path: "new",
      element: <RecipeForm />,
      handle: RecipesController,
    },
    {
      path: ":recipe_id",
      action: method({ put: updateRecipe, delete: deleteRecipe }),
      children: [
        {
          index: true,
          element: <Recipe />,
          loader: getRecipe,
          handle: RecipesController,
        },
        {
          path: "edit",
          element: <RecipeForm />,
          loader: getRecipe,
          handle: RecipesController,
        },
      ],
    },
  ],
};
