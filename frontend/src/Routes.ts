// components
import { Header } from "./components/Header/Header";
import { Logout } from "./components/Logout/Logout";
import { Footer } from "./components/Footer/Footer";
import { Form } from "./components/Form/Form";
import { Item } from "./components/Item/Item";

export { Header, Logout, Footer, Form, Item };

// icons
import iconCheck from "./assets/icons/check.svg";
import iconEdit from "./assets/icons/edit.svg";
import iconEyeClose from "./assets/icons/eye_close.svg";
import iconEyeOpen from "./assets/icons/eye_open.svg";
import iconMoon from "./assets/icons/moon.svg";
import iconSun from "./assets/icons/sun.svg";
import iconTrash from "./assets/icons/trash.svg";

export {
  iconCheck,
  iconEdit,
  iconEyeClose,
  iconEyeOpen,
  iconMoon,
  iconSun,
  iconTrash,
};

// pages
import { Login } from "./pages/Login/Login";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Register } from "./pages/Register/Register";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";
import { Tasks } from "./pages/Task/Tasks";

export { Login, ProtectedRoute, Register, ResetPassword, Tasks };
