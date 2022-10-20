import React, { createContext, useState } from "react";
import { useMatches } from "react-router-dom";

type ContextType = {
  context: { dialog?: boolean; actionLabel?: string } | undefined;
};

export const NavigationContext = createContext<ContextType>(undefined);

export default function withNavigationContext(
  Component: (props: any) => JSX.Element
) {
  return ({ ...rest }) => {
    const matches = useMatches();
    const context: ContextType["context"] = {};
    const route_id = matches[matches.length - 1].id;
    if (/0(-\d)*-0/.test(route_id)) {
      context.dialog = false;
    }
    if (/0(-\d)*-1/.test(route_id)) {
      context.dialog = true;
      context.actionLabel = "Save";
    }

    return (
      <NavigationContext.Provider value={{ context }}>
        <Component {...rest} />
      </NavigationContext.Provider>
    );
  };
}
