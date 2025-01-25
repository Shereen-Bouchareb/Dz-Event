import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const rootElement = document.getElementById("root");

// Ensure the root element exists in your `index.html`
if (rootElement) {
  const root = createRoot(rootElement); // Use createRoot instead of ReactDOM.render
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
} else {
  console.error("Root element not found!");
}
