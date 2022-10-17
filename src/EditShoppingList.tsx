import React from "react";
import { Form, useLoaderData } from "react-router-dom";

import Input from "@mui/material/Input";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";

export default function EditShoppingList() {
  const shoppingList = useLoaderData() as any;
  const date = new Date(shoppingList.date);
  const dateValue = `${date.getFullYear()}-${String(date.getMonth()).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;

  return (
    <Form method="post" action="/">
      <Box>
        <Input type="text" defaultValue={shoppingList.name} />
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
