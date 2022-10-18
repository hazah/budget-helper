import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Recipes() {
  const recipes = useLoaderData() as any[];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Recipes
      </Typography>
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
