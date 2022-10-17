import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useLoaderData } from "react-router-dom";

export default function ShoppingLists() {
  const shoppingLists = useLoaderData() as any[];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Shopping Lists
      </Typography>
      <ul>
        {shoppingLists.map(shoppingList => (
          <li key={shoppingList.name}>
            <Link to={`./${shoppingList.id}`}>
              {shoppingList.name} - {shoppingList.date}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
}
