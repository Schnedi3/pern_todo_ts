import { useState } from "react";

import { IFormProps, Task } from "../types/types";
import "../css/form.css";

export const Form = ({ todoList, setTodoList }: IFormProps) => {
  const [newTask, setNewTask] = useState<string>("");

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask) {
      addTask();
    }
  };

  const addTask = () => {
    const task: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    if (!newTask) return;
    setTodoList([...todoList, task]);
    setNewTask("");
  };

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        autoFocus
      />
      <span
        className={newTask ? "clear_icon-show" : ""}
        onClick={() => setNewTask("")}
      >
        ✖
      </span>
    </form>
  );
};
