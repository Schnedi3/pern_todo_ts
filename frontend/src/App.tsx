import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "./components/Header";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Tasks } from "./pages/Tasks";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Logout } from "./components/Logout";

import { useAuthContext } from "./context/useAuthContext";
import "./css/app.css";

export const App = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <main className="app">
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        newestOnTop={true}
      />

      <div className="header_image"></div>
      <Header />

      {isAuthenticated && <Logout />}

      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Tasks />} />
        </Route>

        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
};
