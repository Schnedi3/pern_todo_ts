import { useState } from "react";

import { useAddTask } from "../../api/task";
import styles from "./form.module.css";

export const Form = () => {
  const [newTask, setNewTask] = useState<string>("");
  const { mutate: addTask } = useAddTask();

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTask) {
      addTask(newTask);
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
