import "bootstrap/dist/css/bootstrap.min.css";
import App from "~/components/App";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootDiv = document.createElement("div");
rootDiv.id = "root";
document.body.appendChild(rootDiv);

const root = createRoot(rootDiv);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
