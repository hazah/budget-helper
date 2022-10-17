import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Shopping Lists</Link>
          </li>
          <li>
            <Link to="/available_products">Available Products</Link>
          </li>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/stores">Stores</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

