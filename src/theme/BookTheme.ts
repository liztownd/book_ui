import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

export const bookTheme = createTheme({
  palette: {
    primary: {
      // light: "#cb7151",
      // main: "#e28743",
      // dark: "#be4d25",
      light: "#f0a9a4",
      main: "#d4847f",
      dark: "#145369",
      contrastText: "#2e2e2e",
    },
    secondary: {
      light: "#2596be",
      main: "#145369",
      dark: "#2e2e2e",
      contrastText: "#ffffff",
      // light: "#6c6c6c",
      // main: "#2e2e2e",
      // dark: "#1e1e1e",
      // contrastText: "#ffffff",
    },
    background: {
      default: blueGrey["100"],
    },
  },
  spacing: 8,
});
