import React, { ChangeEventHandler, MouseEventHandler } from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

type UsernameProps = {
  defaultUsername: string;
  usernameHasError: boolean;
  usernameError?: string | null;
  onUsernameChange: ChangeEventHandler;
};

type PasswordProps = {
  passwordHasError: boolean;
  passwordError?: string | null;
  showPassword: boolean;
  onPasswordChange: ChangeEventHandler;
};

type LoginProps = {
  open: boolean;
  username: UsernameProps;
  password: PasswordProps;
  onLogin: MouseEventHandler;
  onClose: MouseEventHandler;
  onUsernameChange: ChangeEventHandler;
  onPasswordChange: ChangeEventHandler;
};

function Username({
  defaultUsername,
  usernameHasError,
  usernameError,
  onUsernameChange,
}: UsernameProps) {
  return (
    <TextField
      error={usernameHasError}
      helperText={usernameHasError && usernameError}
      autoFocus
      id="username"
      inputProps={{ "data-testid": "username" }}
      label="Username"
      type="text"
      fullWidth
      variant="standard"
      defaultValue={defaultUsername}
      onChange={onUsernameChange}
    />
  );
}

function Password({
  passwordHasError,
  passwordError,
  onPasswordChange,
  showPassword,
}: PasswordProps) {
  return (
    <TextField
      error={passwordHasError}
      helperText={passwordHasError && passwordError}
      id="password"
      inputProps={{ "data-testid": "password" }}
      label="Password"
      type={showPassword ? "text" : "password"}
      fullWidth
      variant="standard"
      defaultValue=""
      onChange={onPasswordChange}
    />
  );
}

export default function Login({
  open,
  username,
  password,
  onLogin,
  onClose,
  onUsernameChange,
  onPasswordChange,
}: LoginProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Log in</DialogTitle>
      <DialogContent>
        <DialogContentText>Login</DialogContentText>
        <Username {...{ ...username, onUsernameChange }} />
        <Password {...{ ...password, onPasswordChange }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onLogin}>Log in</Button>
      </DialogActions>
    </Dialog>
  );
}

Username.propTypes = {
  defaultUsername: PropTypes.string.isRequired,
  usernameHasError: PropTypes.bool.isRequired,
  usernameError: PropTypes.string,
  onUsernameChange: PropTypes.func.isRequired,
};

Password.propTypes = {
  passwordHasError: PropTypes.bool.isRequired,
  passwordError: PropTypes.string,
  onPasswordChange: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
};

Login.propTypes = {
  open: PropTypes.bool.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
};
