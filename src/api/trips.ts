import { json, redirect } from "react-router-dom";

export function getTrips() {
  const today = new Date();
  const tomorrow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDay() + 1
  );

  return json([
    { id: 1, name: "shopping list 1", date: today },
    { id: 2, name: "shopping list 2", date: tomorrow },
  ]);
}

export function createTrip() {
  return redirect(`/1`);
}

export function getTrip() {
  const today = new Date();

  return json({ id: 1, name: "shopping list 1", date: today });
}

export async function updateTrip(everything) {
  console.debug(Object.fromEntries(await everything.request.formData()));
  return getTrip();
}

export function deleteTrip() {
  return redirect(`/`);
}
