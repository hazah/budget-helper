import React from "react";
import { useLoaderData } from "react-router-dom";

import ListItemLink from "./ListItemLink";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";

export default function Stores() {
  const stores = useLoaderData() as any[];

  return (
    <Paper elevation={0}>
      <nav>
        <List>
          {stores.map(store => (
            <ListItemLink
              key={store.name}
              to={`/stores/${store.id}`}
              primary={`${store.name}`}
            />
          ))}
        </List>
      </nav>
    </Paper>
  );
}
