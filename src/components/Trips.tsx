import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Trips() {
  const trips = useLoaderData() as any[];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ul>
        {trips.map(trip => (
          <li key={trip.name}>
            <Link to={`./${trip.id}`}>
              {trip.name} - {trip.date}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
}
