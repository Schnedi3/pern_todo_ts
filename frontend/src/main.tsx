import { App } from "./App";

import React from "react";
import ReactDOM from "react-dom/client";
import { TaskProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>
);
