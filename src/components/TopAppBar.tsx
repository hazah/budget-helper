import React from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Login from "@mui/icons-material/Login";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Close from "@mui/icons-material/Close";
import MoreVert from "@mui/icons-material/MoreVert";

import styled from "@emotion/styled";

const BasicAppBar = styled(AppBar)({
  flexGrow: 1,
});

const Title = styled(Typography)({
  flexGrow: 1,
});

function ContextualAppBar({ dialog = false, actionLabel = null, title }) {
  return (
    <BasicAppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label={dialog ? "close" : "back"}
          sx={{ mr: 2 }}
        >
          {dialog ? <Close /> : <ArrowBack />}
        </IconButton>
        <Title variant="h6">{title}</Title>
        {dialog ? (
          <Button color="inherit">{actionLabel}</Button>
        ) : (
          <IconButton size="large" aria-label="more" edge="end" color="inherit">
            <MoreVert />
          </IconButton>
        )}
      </Toolbar>
    </BasicAppBar>
  );
}

export default function TopAppBar({ context, title }) {
  return Object.keys(context).length !== 0 ? (
    <ContextualAppBar {...{ title, ...context }} />
  ) : (
    <BasicAppBar position="static">
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
        <Title variant="h6">{title}</Title>
        <IconButton size="large" aria-label="login" edge="end" color="inherit">
          <Login />
        </IconButton>
      </Toolbar>
    </BasicAppBar>
  );
}
