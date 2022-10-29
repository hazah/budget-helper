import React from "react";

import { createLogin } from "api/login";
import method from "method";
import Login from "components/Login";
import LoginController from "controllers/LoginController";

export const login = {
  path: "login",
  id: "user",
  action: method({ post: createLogin }),
  children: [
    {
      index: true,
      element: <Login />,
      handle: LoginController,
    },
  ],
};
