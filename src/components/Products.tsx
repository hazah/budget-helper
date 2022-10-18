import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Products() {
  const products = useLoaderData() as any[];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Recipes
      </Typography>
      <ul>
        {products.map(product => (
          <li key={product.name}>
            <Link to={`./${product.id}`}>
              {product.name} {product.lifespan.duration}{" "}
              {product.lifespan.interval}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
}
