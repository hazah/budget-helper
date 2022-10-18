import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function ShoppingList() {
  const shoppingList = useLoaderData() as any;

  return <Link to="edit">{shoppingList.name}</Link>;
}
