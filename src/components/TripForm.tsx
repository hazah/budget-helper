import React from "react";
import { Form, useLoaderData } from "react-router-dom";

import Input from "@mui/material/Input";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";

export default function TripForm() {
  const trip = useLoaderData() as any;
  const date = new Date(trip?.date);
  const dateValue = `${date.getFullYear()}-${String(date.getMonth()).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;

  return (
    <Form method={trip ? "put" : "post"} action={trip ? `/${trip.id}` : "/"}>
      <Box>
        <Input type="text" defaultValue={trip?.name} />
      </Box>
      <Box>
        <Input type="date" defaultValue={dateValue} />
      </Box>
      <Box>
        <Button type="submit">Save</Button>
      </Box>
    </Form>
  );
}
