import { useState } from "react";
import { toast } from "react-toastify";

import { useTodoStore } from "../../store/todoStore";
import { addTaskRequest } from "../../api/task";
import styles from "./form.module.css";

export const Form = () => {
  const [newTask, setNewTask] = useState<string>("");
  const { addTodo } = useTodoStore();

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask) {
      addTask();
    }
  };

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const { data } = await addTaskRequest(newTask);

        if (!data.success) {
          console.log(data.message);
        }

        addTodo(data.result);
        setNewTask("");
        toast.success(data.message);
      } catch (error) {
        console.log(
          error instanceof Error ? error.message : "Unexpected error"
        );
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleOnSubmit}>
      <h1 className={styles.title}>todo</h1>
      <article className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          autoFocus
        />
        <span
          className={`${styles.span} ${newTask ? styles.iconClear : ""}`}
          onClick={() => setNewTask("")}
        >
          ✖
        </span>
      </article>
    </form>
  );
};
