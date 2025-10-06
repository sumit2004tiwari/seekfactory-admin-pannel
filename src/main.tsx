import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AdminAuthProvider } from "./context/admin/AuthContext"; // ✅ named import

import App from "./App";
import { basePath } from "./context/constants";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basePath}>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
