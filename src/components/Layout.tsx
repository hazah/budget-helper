import React, { createContext, useState } from "react";
import { Outlet, useMatches } from "react-router-dom";
import Box from "@mui/material/Box";
import MainNavigation from "components/MainNavigation";
import styled from "@emotion/styled";

import TopAppBar from "components/TopAppBar";

const Container = styled(Box)({
  minHeight: "100vh",
});

const Navigation = styled(MainNavigation)({
  position: "absolute",
  bottom: 0,
  minWidth: "100%",
});

function useController() {
  const matches = useMatches();
  const match = matches.slice(-1).pop();
  const Controller = match.handle as { new (data: unknown): any };

  if (!Controller) {
    throw Error("Controller not implemented");
  }

  return new Controller(match.data);
}

export default function Layout() {
  const controller = useController();
  return (
    <Container>
      <TopAppBar title={controller.title} context={{}} />
      <Outlet />
      <Navigation />
    </Container>
  );
}
