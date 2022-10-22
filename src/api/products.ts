import { json, redirect } from "react-router-dom";

export function getProducts() {
  return json([
    { id: 1, name: "product 1", lifespan: { duration: 2, interval: "week" } },
    { id: 2, name: "product 2", lifespan: { duration: 1, interval: "month" } },
  ]);
}

export function createProduct() {
  return redirect(`/products/1`);
}

export function getProduct() {
  return json({
    id: 1,
    name: "product 1",
    lifespan: { duration: 2, interval: "week" },
  });
}

export function updateProduct({ params }) {
  return redirect(`/products/${params.product_id}`);
}

export function deleteProduct() {
  return redirect(`/products`);
}
