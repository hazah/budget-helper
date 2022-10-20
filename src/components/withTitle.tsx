import React, { createContext } from "react";
import Title from "components/Title";

type TitleType = {
  title: string | JSX.Element | undefined;
};

export const TitleContext = createContext<TitleType>(undefined);

export default function withTitle(Component: (props: any) => JSX.Element) {
  return ({ ...rest }) => {
    return (
      <TitleContext.Provider value={{ title: <Title /> }}>
        <Component {...rest} />
      </TitleContext.Provider>
    );
  };
}
