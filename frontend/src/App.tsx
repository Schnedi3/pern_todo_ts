import "./css/app.css";

import { useAuth } from "./hooks/useAuth";

import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { AuthForm } from "./components/AuthForm";
import { Logout } from "./components/Logout";

export const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main className="app">
      <div className="header__image"></div>
      {isAuthenticated ? (
        <>
          <Logout />
          <div className="main__container">
            <TaskForm />
            <TaskList />
          </div>
        </>
      ) : (
        <div className="main__container">
          <AuthForm />
        </div>
      )}
    </main>
  );
};
