import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import MainNavigation from "components/MainNavigation";
import styled from "@emotion/styled";

import TopAppBar from "components/TopAppBar";
import { TitleContext } from "components/withTitle";
import { NavigationContext } from "./withNavigationContext";

const Container = styled(Box)({
  minHeight: "100vh",
});

const Navigation = styled(MainNavigation)({
  position: "absolute",
  bottom: 0,
  minWidth: "100%",
});

export default function Layout() {
  return (
    <Container>
      <TitleContext.Consumer>
        {({ title }) => (
          <NavigationContext.Consumer>
            {(context) => <TopAppBar title={title} {...context} />}
          </NavigationContext.Consumer>
        )}
      </TitleContext.Consumer>
      <Outlet />
      <Navigation />
    </Container>
  );
}
