import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";

import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>
);
