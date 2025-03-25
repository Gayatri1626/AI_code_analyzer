import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";  // Ensure this is correctly imported for Tailwind to work

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
