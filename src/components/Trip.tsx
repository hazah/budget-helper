import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function Trip() {
  const trip = useLoaderData() as any;

  return <Link to="edit">{trip.name}</Link>;
}
