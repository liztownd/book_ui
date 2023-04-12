import { FunctionComponent } from "react";
import "./App.css";
import { Provider as UserProvider } from "./contexts/UserContext";
import Router from "./Router";
import { ThemeProvider } from "@mui/material";
import { bookTheme } from "./theme/BookTheme";

interface Props {}

const App: FunctionComponent<Props> = () => {
  return (
    <UserProvider>
      <ThemeProvider theme={bookTheme}>
        <div style={{ width: "100vw", height: "100vh" }}>
          <Router />
        </div>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
