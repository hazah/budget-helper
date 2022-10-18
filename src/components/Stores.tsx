import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Stores() {
  const stores = useLoaderData() as any[];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Stores
      </Typography>
      <ul>
        {stores.map(store => (
          <li key={store.name}>
            <Link to={`/stores/${store.id}`}>{store.name}</Link>
          </li>
        ))}
      </ul>
    </Box>
  );
}
