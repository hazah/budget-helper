import { createTheme } from "@mui/material/styles";

const THEME = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // body: {
        //   minHeight: "100vh",
        //   "> #root": {
        //     minHeight: "100vh",
        //   },
        // },
      },
    },
  },
  // palette: {
  //   primary: {
  //     main: "#04810e",
  //   },
  //   secondary: {
  //     main: "#5a1153",
  //   },
  // },
});

export default THEME;
