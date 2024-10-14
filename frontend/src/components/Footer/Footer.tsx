import { useEffect, useState } from "react";

import { IFooterProps } from "../../types/types";
import styles from "./footer.module.css";

export const Footer = ({ todoList, setFilteredList }: IFooterProps) => {
  const [category, setCategory] = useState<string>("all");

  useEffect(() => {
    const filtered = todoList.filter((task) => {
      if (category === "active") return !task.completed;
      if (category === "completed") return task.completed;
      return task;
    });

    setFilteredList(filtered);
  }, [category, todoList, setFilteredList]);

  const tasksLeft = todoList.filter((task) => !task.completed);

  const noTasks = todoList.length === 0;
  const noActiveTasks = todoList.some((task) => !task.completed);
  const noCompletedTasks = todoList.some((task) => task.completed);

  return (
    <footer className={styles.footer}>
      <p>
        {tasksLeft.length} {tasksLeft.length > 1 ? "tasks" : "task"} left
      </p>
      <ul className={styles.categories}>
        <li
          className={`${styles.category} ${
            category === "all" ? styles.active : ""
          } ${noTasks ? styles.disabled : ""}`}
          onClick={() => setCategory("all")}
        >
          All
        </li>
        <li
          className={`${styles.category} ${
            category === "active" ? styles.active : ""
          } ${noActiveTasks || noTasks ? styles.disabled : ""}`}
          onClick={() => setCategory("active")}
        >
          Active
        </li>
        <li
          className={`${styles.category} ${
            category === "completed" ? styles.active : ""
          } ${noCompletedTasks || noTasks ? styles.disabled : ""}`}
          onClick={() => setCategory("completed")}
        >
          Completed
        </li>
      </ul>
    </footer>
  );
};
