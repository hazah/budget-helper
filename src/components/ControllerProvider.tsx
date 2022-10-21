import Controller from "controllers/Controller";
import React, { createContext } from "react";
import { useMatches } from "react-router-dom";

const ControllerContext = createContext<Controller>(undefined);

function useController() {
  const matches = useMatches();
  const match = matches.slice(-1).pop();
  const Controller = match.handle as { new (data: unknown): any };

  if (!Controller) {
    throw Error("Controller not implemented");
  }

  return new Controller(match.data);
}

export function withController(Component) {
  return props => {
    const controller = useController();
    return (
      <ControllerProvider controller={controller}>
        <Component {...props} />
      </ControllerProvider>
    );
  };
}

function ControllerProvider({ controller, children }) {
  return (
    <ControllerContext.Provider value={controller}>
      {children}
    </ControllerContext.Provider>
  );
}

export function ControllerConsumer({ children }) {
  return (
    <ControllerContext.Consumer>
      {children}
    </ControllerContext.Consumer>
  );
}
