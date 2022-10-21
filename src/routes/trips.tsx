import React from "react";
import { json, redirect } from "react-router-dom";

import method from "method";

import Trips from "components/Trips";
import Trip from "components/Trip";
import TripForm from "components/TripForm";
import TripsController from "controllers/TripsController";

function tripsLoader() {
  console.debug("loading all trips...")
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

function createTrip() {
  return redirect(`/1`);
}

function tripLoader() {
  console.debug("loading a trip...")
  const today = new Date();

  return json({ id: 1, name: "shopping list 1", date: today });
}

function updateTrip() {
  return tripLoader();
}

function deleteTrip() {
  return redirect(`/`);
}

export const trips = {
  path: "/*",
  action: createTrip,
  children: [
    {
      index: true,
      element: <Trips />,
      id: "trips",
      loader: tripsLoader,
      handle: TripsController,
    },
    {
      path: "new",
      element: <TripForm />,
      handle: TripsController
    },
    {
      path: ":trip_id",
      action: method({
        put: updateTrip,
        delete: deleteTrip,
      }),
      children: [
        {
          index: true,
          id: "trip",
          element: <Trip />,
          loader: tripLoader,
          handle: TripsController,
        },
        {
          path: "edit",
          element: <TripForm />,
          loader: tripLoader,
          handle: TripsController,
        },
      ],
    },
  ],
};
