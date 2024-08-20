import "./css/app.css";

import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

export const App = () => {
  return (
    <main className="app">
      <div className="header__image"></div>
      <div className="todo__container">
        <TaskForm />
        <TaskList />
      </div>
    </main>
  );
};
