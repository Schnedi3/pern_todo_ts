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
import iconGoogle from "./assets/icons/google.svg";
import iconTheme from "./assets/icons/theme.svg";
import iconTrash from "./assets/icons/trash.svg";

export {
  iconCheck,
  iconEdit,
  iconEyeClose,
  iconEyeOpen,
  iconGoogle,
  iconTheme,
  iconTrash,
};

// pages
import { Login } from "./pages/Auth/Login";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Register } from "./pages/Auth/Register";
import { ResetPassword } from "./pages/Auth/ResetPassword";
import { Todo } from "./pages/Todo/Todo";

export { Login, ProtectedRoute, Register, ResetPassword, Todo };
