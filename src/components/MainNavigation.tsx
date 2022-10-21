import React, { useState } from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Store from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KitchenIcon from "@mui/icons-material/Kitchen";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";

const links: Record<string, { label: string; icon: JSX.Element }> = {
  inventory: { label: "Inventory", icon: <KitchenIcon /> },
  recipes: { label: "Recipes", icon: <SoupKitchenIcon /> },
  "/": { label: "Trips", icon: <ShoppingCartIcon /> },
  products: { label: "Products", icon: <BreakfastDiningIcon /> },
  stores: { label: "Stores", icon: <Store /> },
};

export default function MainNavigation({ className }: { className?: string }) {
  const [value, setValue] = useState();

  return (
    <BottomNavigation
      className={className}
      showLabels
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue);
      }}
    >
      {Object.keys(links).map(path => (
        <BottomNavigationAction
          key={path}
          label={links[path].label}
          component={Link}
          to={path}
          icon={links[path].icon}
        />
      ))}
    </BottomNavigation>
  );
}
