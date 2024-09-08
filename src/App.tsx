import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { TaskItem } from "./components/TaskItem";

import "./css/app.css";

export const App = () => {
  return (
    <main className="app">
      <figure className="header__image"></figure>
      <div className="todo container">
        <Header />
        <TaskForm />
        <TaskItem />
      </div>
    </main>
  );
};
