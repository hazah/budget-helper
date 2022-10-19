import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import Login from "@mui/icons-material/Login";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type Props = {
  heading: string;
};

export default function TopMenu({ heading }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [anchor, setAnchor] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameIsBlankError, setUsernameIsBlankError] = useState(false);
  const [passwordIsBlankError, setPasswordIsBlankError] = useState(false);

  const onClick = (event: { target: any }) => {
    setAnchor(event.target);
    setOpen(true);
  };

  const onClose = () => {
    setAnchor(null);
    setOpen(false);
    setUsername("");
    setPassword("");
    setUsernameIsBlankError(false);
    setPasswordIsBlankError(false);
  };

  const login = () => {
    console.log(username, password);
    if (username.length === 0) {
      setUsernameIsBlankError(true);
    }
    if (password.length === 0) {
      setPasswordIsBlankError(true);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {heading}
          </Typography>
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <Tooltip title={false ? "More actions" : "Login"}>
            {false ? (
              <IconButton
                size="large"
                aria-label="display more actions"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                edge="end"
                color="inherit"
                onClick={onClick}
              >
                <MoreIcon />
              </IconButton>
            ) : (
              <IconButton
                size="large"
                aria-label="login"
                edge="end"
                color="inherit"
                onClick={onClick}
              >
                <Login />
              </IconButton>
            )}
          </Tooltip>
        </Toolbar>
        <Dialog open={open && !false} onClose={onClose}>
          <DialogTitle>Log in</DialogTitle>
          <DialogContent>
            <DialogContentText>Login</DialogContentText>
            <TextField
              error={usernameIsBlankError}
              helperText={
                usernameIsBlankError ? "Username cannot be blank" : null
              }
              autoFocus
              id="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={username}
              onChange={(event) => setUsername(event.target.value.trim())}
            />
            <TextField
              error={passwordIsBlankError}
              helperText={
                passwordIsBlankError ? "Password cannot be blank" : null
              }
              id="password"
              label="Password"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={login}>Log in</Button>
          </DialogActions>
        </Dialog>
        <Menu
          anchorEl={anchor}
          id="account-menu"
          open={open && false}
          onClose={onClose}
          onClick={onClose}
        >
          <MenuItem>
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        </Menu>
      </AppBar>
    </Box>
  );
}
