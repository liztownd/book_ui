"use client";

import { ErrorBoundary } from "react-error-boundary";
import { FunctionComponent } from "react";
import "./App.css";
import { Provider as UserProvider } from "./contexts/UserContext";
import { SnackbarProvider } from "notistack";
import Router from "./Router";
import { ThemeProvider } from "@mui/material";
import { bookTheme } from "./theme/BookTheme";

interface Props {}

const App: FunctionComponent<Props> = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <SnackbarProvider>
        <UserProvider>
          <ThemeProvider theme={bookTheme}>
            <div style={{ width: "100vw", height: "100vh" }}>
              <Router />
            </div>
          </ThemeProvider>
        </UserProvider>
      </SnackbarProvider>
    </ErrorBoundary>
  );
};

export default App;
