import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/context";
import { MailContextProvider } from "./context/MailCotext";

ReactDOM.render(
  <ContextProvider>
    <MailContextProvider>
      <App />
    </MailContextProvider>
  </ContextProvider>,
  document.getElementById("root")
);
