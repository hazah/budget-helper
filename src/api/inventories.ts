import { json, redirect } from "react-router-dom";

export function getInventories() {
  return json([
    { id: 1, name: "product 1", units: 2 },
    { id: 2, name: "product 2", units: 5 },
  ]);
}

export function createInventory() {
  return redirect("/inventories");
}

export function getInventory() {
  return json({ id: 1, name: "product 1", units: 2 });
}

export function updateInventory({ params }) {
  return redirect(`/inventories/${params.inventory_id}`);
}

export function deleteInventory() {
  return redirect(`/inventories`);
}
