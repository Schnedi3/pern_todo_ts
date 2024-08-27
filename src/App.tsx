import "./css/app.css";

import { TaskForm } from "./components/TaskForm";
import { TaskItem } from "./components/TaskItem";

export const App = () => {
  return (
    <main className="app">
      <div className="header__image"></div>
      <div className="todo__container">
        <TaskForm />
        <TaskItem />
      </div>
    </main>
  );
};
