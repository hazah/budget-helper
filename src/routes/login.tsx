import React from "react";
import { Outlet } from "react-router-dom";

import { createLogin } from "api/login";
import method from "method";

export const login = {
  path: "login",
  id: "user",
  action: method({ post: createLogin }),
  children: [
    {
      index: true,
      element: <Outlet />,
    },
  ],
};
