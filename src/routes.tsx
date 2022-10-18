import React from "react";

import { available_products } from "routes/available_products";
import { products } from "routes/products";
import { recipes } from "routes/recipes";
import { shopping_lists } from "routes/shopping_lists";
import { stores } from "routes/stores";

import Layout from "components/Layout";

export default [
  {
    element: <Layout />,
    children: [
      shopping_lists,
      available_products,
      recipes,
      products,
      stores,
    ],
  },
];
