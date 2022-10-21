import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Box from "@mui/material/Box";

export default function Stores() {
  const stores = useLoaderData() as any[];

  return (
    <Box sx={{ flexGrow: 1 }}>
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
