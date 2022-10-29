import React from "react";
import { Form } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Login() {
  return (
    <Form action="/login" method="post">
      <TextField type="text" variant="filled" id="username" name="username" />
      <TextField type="password" variant="filled" id="password" name="password" />
      <Button variant="contained" type="submit">Login</Button>
    </Form>
  );
}
