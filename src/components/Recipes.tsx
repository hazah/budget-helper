import React from "react";
import { useLoaderData } from "react-router-dom";

import ListItemLink from "./ListItemLink";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";

export default function Recipes() {
  const recipes = useLoaderData() as any[];

  return (
    <Paper elevation={0}>
      <nav>
        <List>
          {recipes.map(recipe => (
            <ListItemLink
              key={recipe.name}
              to={`/recipes/${recipe.id}`}
              primary={`${recipe.name}`}
            />
          ))}
        </List>
      </nav>
    </Paper>
  );
}
