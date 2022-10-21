import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Box from "@mui/material/Box";

export default function Recipes() {
  const recipes = useLoaderData() as any[];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.name}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </Box>
  );
}
