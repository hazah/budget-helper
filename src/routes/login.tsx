import React from "react";
import { Outlet } from "react-router-dom";

import { createLogin } from "api/login";

export const login = {
  path: "login",
  id: "user",
  action: createLogin,
  children: [
    {
      index: true,
      element: <Outlet />,
    },
  ],
};
