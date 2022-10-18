import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function AvailableProducts() {
  const availableProducts = useLoaderData() as any[];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Available Products
      </Typography>
      <ul>
        {availableProducts.map(availableProduct => (
          <li key={availableProduct.name}>
            <Link to={`/products/${availableProduct.id}`}>
              {availableProduct.name} - {availableProduct.units}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
}
