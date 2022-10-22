import React from "react";
import { json, redirect } from "react-router-dom";

import method from "method";

import Trips from "components/Trips";
import Trip from "components/Trip";
import TripForm from "components/TripForm";
import TripsController from "controllers/TripsController";
import {
  createTrip,
  getTrips,
  updateTrip,
  deleteTrip,
  getTrip,
} from "api/trips";

export const trips = {
  path: "/*",
  action: createTrip,
  children: [
    {
      index: true,
      element: <Trips />,
      id: "trips",
      loader: getTrips,
      handle: TripsController,
    },
    {
      path: "new",
      element: <TripForm />,
      handle: TripsController,
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
          loader: getTrip,
          handle: TripsController,
        },
        {
          path: "edit",
          element: <TripForm />,
          loader: getTrip,
          handle: TripsController,
        },
      ],
    },
  ],
};
