import React from "react";
import { useLoaderData } from "react-router-dom";

import ListItemLink from "./ListItemLink";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";

export default function Products() {
  const products = useLoaderData() as any[];

  return (
    <Paper elevation={0}>
      <nav>
        <List>
          {products.map(product => (
            <ListItemLink
              key={product.name}
              to={`./${product.id}`}
              primary={`${product.name} ${product.lifespan.duration} ${product.lifespan.interval}`}
            />
          ))}
        </List>
      </nav>
    </Paper>
  );
}
