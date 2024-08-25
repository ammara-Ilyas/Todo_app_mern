import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TodoProvider from "./components/contextApi/ContextApi.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap the App component with TodoProvider */}
    <TodoProvider>
      <App />
    </TodoProvider>
  </StrictMode>
);
