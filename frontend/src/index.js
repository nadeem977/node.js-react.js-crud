import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import {AppContectProvider} from "./context/appSlice";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
  <React.StrictMode>
    <SnackbarProvider>
      <AppContectProvider>
        <App />
      </AppContectProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
