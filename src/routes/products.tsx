import React from "react";

import method from "method";

import Products from "components/Products";
import Product from "components/Product";
import ProductForm from "components/ProductForm";
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
      element: <ProductForm />,
      handle: ProductsController,
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
          element: <ProductForm />,
          loader: getProduct,
          handle: ProductsController,
        },
      ],
    },
  ],
};
