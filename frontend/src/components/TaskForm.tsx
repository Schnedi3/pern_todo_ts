import { useCallback, useEffect, useState } from "react";

import { useAuthContext } from "../context/useAuthContext";
import { addTaskRequest, getTasksRequest } from "../api/tasks";
import { IFormProps } from "../types/types";
import "../css/taskform.css";

export const TaskForm = ({ todoList, setTodoList }: IFormProps) => {
  const [newTask, setNewTask] = useState<string>("");
  const { isAuthenticated } = useAuthContext();

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask) {
      addTask();
    }
  };

  const getTasks = useCallback(async () => {
    try {
      const res = await getTasksRequest();
      setTodoList(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [setTodoList]);

  useEffect(() => {
    if (isAuthenticated) {
      getTasks();
    }
  }, [isAuthenticated, getTasks]);

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const res = await addTaskRequest(newTask);
        setTodoList([...todoList, res.data]);
        setNewTask("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form className="task_form" onSubmit={handleOnSubmit}>
      <h1>todo</h1>
      <article className="input_continer">
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
      </article>
    </form>
  );
};
