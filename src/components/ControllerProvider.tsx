import Controller from "controllers/Controller";
import React, {
  Component,
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
} from "react";
import { ComponentType } from "react";
import { useMatches } from "react-router-dom";

const ControllerContext = createContext<Controller>(undefined);

function useNewController() {
  const matches = useMatches();
  const match = matches.slice(-1).pop();
  const Controller = match.handle as { new (data: unknown): any };

  if (!Controller) {
    return undefined;
  }

  return new Controller(match.data);
}

type Props = {
  children?: ReactNode;
};

export function withController(WrappedComponent) {
  return (props: Props) => {
    const controller = useNewController();
    return (
      <ControllerProvider controller={controller}>
        <WrappedComponent {...props} />
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
  return <ControllerContext.Consumer>{children}</ControllerContext.Consumer>;
}

export function useController() {
  return useContext(ControllerContext);
}
