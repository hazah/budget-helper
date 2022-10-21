import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import MainNavigation from "components/MainNavigation";
import styled from "@emotion/styled";

import TopAppBar from "components/TopAppBar";
import { ControllerConsumer, withController } from "./ControllerProvider";

const Container = styled(Box)({
  minHeight: "100vh",
});

const Navigation = styled(MainNavigation)({
  position: "absolute",
  bottom: 0,
  minWidth: "100%",
});

export default withController(function Layout() {
  return (
    <Container>
      <ControllerConsumer>
        {controller => <TopAppBar title={controller.title} context={{}} />}
      </ControllerConsumer>
      <Outlet />
      <Navigation />
    </Container>
  );
});
