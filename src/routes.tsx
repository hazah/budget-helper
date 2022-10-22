import React from "react";

import { login } from "routes/login";
import { inventory } from "routes/inventory";
import { products } from "routes/products";
import { recipes } from "routes/recipes";
import { trips } from "routes/trips";
import { stores } from "routes/stores";

import Layout from "components/Layout";

export default [
  {
    element: <Layout />,
    children: [login, inventory, recipes, trips, products, stores],
  },
];
