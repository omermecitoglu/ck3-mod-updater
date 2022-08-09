import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import App from "~/components/App";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

const rootDiv = document.createElement("div");
rootDiv.id = "root";
document.body.appendChild(rootDiv);

const root = createRoot(rootDiv);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
