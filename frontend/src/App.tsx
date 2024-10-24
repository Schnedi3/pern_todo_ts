import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Header,
  Login,
  ProtectedRoute,
  Register,
  ResetPassword,
  Todo,
} from "./Routes";
import { RootLayout } from "./layout/RootLayout";
import "./app.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="Login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="reset-password" element={<ResetPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route index element={<Todo />} />
      </Route>
    </Route>
  )
);

export const App = () => {
  return (
    <main className="app">
      <ToastContainer
        autoClose={1500}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        newestOnTop={true}
      />

      <div className="header"></div>
      <Header />

      <RouterProvider router={router} />
    </main>
  );
};
