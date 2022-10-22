import { json, redirect } from "react-router-dom";

export function getRecipes() {
  return json([
    { id: 1, name: "recipe 1" },
    { id: 2, name: "recipe 2" },
  ]);
}

export function createRecipe() {
  return redirect(`/recipes/1`);
}

export function getRecipe() {
  return json({ id: 1, name: "recipe 1" });
}

export function updateRecipe({ params }) {
  return redirect(`/recipes/${params.recipe_id}`);
}

export function deleteRecipe() {
  return redirect(`/recipes`);
}
