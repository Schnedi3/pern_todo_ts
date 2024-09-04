import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Tasks } from "./pages/Tasks";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Logout } from "./components/Logout";
import { useAuthContext } from "./context/useAuthContext";

import "./css/app.css";

export const App = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <BrowserRouter>
      <main className="app">
        <div className="header__image"></div>
        <Header />

        {isAuthenticated && <Logout />}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<Tasks />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};
