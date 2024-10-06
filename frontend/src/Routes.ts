// components
import { Header } from "./components/Header";
import { Logout } from "./components/Logout";
import { TaskFooter } from "./components/TaskFooter";
import { TaskForm } from "./components/TaskForm";
import { TaskItem } from "./components/TaskItem";

export { Header, Logout, TaskFooter, TaskForm, TaskItem };

// icons
import iconCheck from "./assets/icons/check.svg";
import iconEdit from "./assets/icons/edit.svg";
import iconMoon from "./assets/icons/moon.svg";
import iconSun from "./assets/icons/sun.svg";
import iconTrash from "./assets/icons/trash.svg";

export { iconCheck, iconEdit, iconMoon, iconSun, iconTrash };

// pages
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Register } from "./pages/Register";
import { Tasks } from "./pages/Tasks";

export { Login, ProtectedRoute, Register, Tasks };
