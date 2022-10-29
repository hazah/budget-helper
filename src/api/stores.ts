import { Store } from "models";
import { json, redirect } from "react-router-dom";

export function getStores() {
  return json([
    { id: '1', name: "store 1" },
    { id: '2', name: "store 2" },
  ] as Store[]);
}

export function createStore() {
  return redirect(`/stores/1`);
}

export function getStore() {
  return json({ id: '1', name: "store 1" } as Store);
}

export function updateStore({ params }) {
  return redirect(`/stores/${params.store_id}`);
}

export function deleteStore() {
  return redirect(`/stores`);
}
