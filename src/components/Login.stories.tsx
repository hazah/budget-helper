import React from "react";
import Login from "components/Login";
import { ComponentMeta } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";

function Template(props) {
  return <Login {...props} />;
}

export const Form = Template.bind({});

Form.args = {
  open: true,
  username: {
    defaultUsername: "",
    usernameHasError: false,
    usernameError: null,
  },
  password: {
    passwordHasError: false,
    passwordError: null,
    showPassword: false,
  },
};

// export const SubmittedWithError = Template.bind({});

// SubmittedWithError.args = Form.args;
// SubmittedWithError.play = async (/*{ args, canvasElement }*/) => {
// const canvas = within(canvasElement);

// await userEvent.type(canvas.getByTestId("username"), "username");
// await userEvent.type(canvas.getByTestId("password"), "supersecret");
// await userEvent.click(canvas.getByRole("button"));

// await waitFor(() => expect(args.onLogin).toHaveBeenCalled());
// };

export default {
  title: "Login",
  component: Login,
  argTypes: {
    onClose: { action: true },
    onLogin: { action: true },
    onUsernameChange: { action: true },
    onPasswordChange: { action: true },
  },
} as ComponentMeta<typeof Login>;
