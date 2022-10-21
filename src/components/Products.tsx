import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Box from "@mui/material/Box";

export default function Products() {
  const products = useLoaderData() as any[];

  return (
    <Box sx={{ flexGrow: 1 }}>
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
