import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Login from "@mui/icons-material/Login";
import Close from "@mui/icons-material/Close";
import MoreVert from "@mui/icons-material/MoreVert";

import styled from "@emotion/styled";

const Container = styled(Box)({
  flexGrow: 1,
});

const Title = styled(Typography)({
  flexGrow: 1,
});

function ContextualAppBar() {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="close"
            sx={{ mr: 2 }}
          >
            <Close />
          </IconButton>
          <Title variant="h6">In Context</Title>
          <IconButton
            size="large"
            aria-label="more"
            edge="end"
            color="inherit"
          >
            <MoreVert />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default function TopAppBar({ context = null }) {
  return context ? (
    <ContextualAppBar {...context} />
  ) : (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Title variant="h6">Place Holder</Title>
          <IconButton
            size="large"
            aria-label="login"
            edge="end"
            color="inherit"
          >
            <Login />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
