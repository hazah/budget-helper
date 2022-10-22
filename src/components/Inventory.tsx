import React from "react";
import { useLoaderData } from "react-router-dom";

import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import ListItemLink from "./ListItemLink";

export default function Inventory() {
  const inventorys = useLoaderData() as any[];

  return (
    <Paper elevation={0}>
      <nav>
        <List>
          {inventorys.map(inventory => (
            <ListItemLink
              key={inventory.name}
              to={`/products/${inventory.id}`}
              primary={`${inventory.name} - ${inventory.units}`}
            />
          ))}
        </List>
      </nav>
    </Paper>
  );
}
