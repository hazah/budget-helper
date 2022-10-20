import React from "react";

import { available_products } from "routes/available_products";
import { products } from "routes/products";
import { recipes } from "routes/recipes";
import { shopping_lists } from "routes/shopping_lists";
import { stores } from "routes/stores";

import Layout from "components/Layout";
import withTitle from "components/withTitle";
import withNavigationContext from "components/withNavigationContext";

const LayoutWithTitle = withTitle(Layout);
const LayoutWithTitleAndNavigationContext =
  withNavigationContext(LayoutWithTitle);

export default [
  {
    element: <LayoutWithTitleAndNavigationContext />,
    children: [available_products, recipes, shopping_lists, products, stores],
  },
];
