import React from "react";

import { inventory } from "routes/inventory";
import { products } from "routes/products";
import { recipes } from "routes/recipes";
import { shopping_lists } from "routes/shopping_lists";
import { stores } from "routes/stores";

import Layout from "components/Layout";

export default [
  {
    element: <Layout />,
    children: [inventory, recipes, shopping_lists, products, stores],
  },
];
