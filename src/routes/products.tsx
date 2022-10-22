import React from "react";

import method from "method";

import Products from "components/Products";
import Product from "components/Product";
import EditProduct from "components/ProductForm";
import ProductsController from "controllers/ProductsController";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "api/products";

export const products = {
  path: "products",
  action: createProduct,
  children: [
    {
      index: true,
      id: "products",
      element: <Products />,
      loader: getProducts,
      handle: ProductsController,
    },
    {
      path: "new",
      element: <EditProduct />,
      handl: ProductsController,
    },
    {
      path: ":product_id",
      action: method({ put: updateProduct, delete: deleteProduct }),
      children: [
        {
          index: true,
          element: <Product />,
          loader: getProduct,
          handle: ProductsController,
        },
        {
          path: "edit",
          element: <EditProduct />,
          loader: getProduct,
          handle: ProductsController,
        },
      ],
    },
  ],
};
