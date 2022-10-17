import React from "react";
import { json, Outlet, redirect } from "react-router-dom";

import method from "method";

import Products from "Products";
import Product from "Product";
import EditProduct from "EditProduct";

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
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Products />,
      loader: productsLoader,
      action: createProduct,
    },
    {
      path: "new",
      element: <EditProduct />,
    },
    {
      path: ":product_id",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Product />,
          loader: productLoader,
          action: method({ put: updateProduct, delete: deleteProduct }),
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
