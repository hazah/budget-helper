import React from "react";
import { useLoaderData } from "react-router-dom";

import ListItemLink from "./ListItemLink";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";

export default function Trips() {
  const trips = useLoaderData() as any[];

  return (
    <Paper elevation={0}>
      <nav>
        <List>
          {trips.map(trip => (
            <ListItemLink
              key={trip.name}
              to={`./${trip.id}`}
              primary={`${trip.name} - ${trip.date}`}
            />
          ))}
        </List>
      </nav>
    </Paper>
  );
}
