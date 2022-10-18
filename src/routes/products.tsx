import React from "react";
import { json, redirect } from "react-router-dom";

import method from "method";

import Products from "components/Products";
import Product from "components/Product";
import EditProduct from "components/EditProduct";

function productsLoader() {
  return json([
    { id: 1, name: "product 1", lifespan: { duration: 2, interval: "week" } },
    { id: 2, name: "product 2", lifespan: { duration: 1, interval: "month" } },
  ]);
}

function createProduct() {
  return redirect(`/products/1`);
}

function productLoader() {
  return json({
    id: 1,
    name: "product 1",
    lifespan: { duration: 2, interval: "week" },
  });
}

function updateProduct({ params }) {
  return redirect(`/products/${params.product_id}`);
}

function deleteProduct() {
  return redirect(`/products`);
}

export const products = {
  path: "products",
  action: createProduct,
  children: [
    {
      index: true,
      id: "products",
      element: <Products />,
      loader: productsLoader,
    },
    {
      path: "new",
      element: <EditProduct />,
    },
    {
      path: ":product_id",
      action: method({ put: updateProduct, delete: deleteProduct }),
      children: [
        {
          index: true,
          element: <Product />,
          loader: productLoader,
        },
        {
          path: "edit",
          element: <EditProduct />,
          loader: productLoader,
        },
      ],
    },
  ],
};
