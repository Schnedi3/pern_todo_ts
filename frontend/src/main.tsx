import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>
);
