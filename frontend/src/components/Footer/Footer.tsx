import { useEffect, useState } from "react";

import { useTask } from "../../api/task";
import { ITask } from "../../types/types";
import styles from "./footer.module.css";

export interface IFooterProps {
  setFilteredList: (filteredList: ITask[]) => void;
}

export const Footer = ({ setFilteredList }: IFooterProps) => {
  const [category, setCategory] = useState<string>("all");
  const { data: todoList } = useTask();

  useEffect(() => {
    const filtered = todoList?.filter((task: ITask) => {
      if (category === "active") return !task.completed;
      if (category === "completed") return task.completed;
      return task;
    });

    setFilteredList(filtered);
  }, [category, todoList, setFilteredList]);

  const tasksLeft = todoList?.filter((task: ITask) => !task.completed);

  const noTasks = todoList?.length === 0;
  const noActiveTasks = todoList?.some((task: ITask) => !task.completed);
  const noCompletedTasks = todoList?.some((task: ITask) => task.completed);

  return (
    <footer className={styles.footer}>
      <p>
        {tasksLeft?.length} {tasksLeft?.length > 1 ? "tasks" : "task"} left
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
          } ${!noActiveTasks || noTasks ? styles.disabled : ""}`}
          onClick={() => setCategory("active")}
        >
          Active
        </li>
        <li
          className={`${styles.category} ${
            category === "completed" ? styles.active : ""
          } ${!noCompletedTasks || noTasks ? styles.disabled : ""}`}
          onClick={() => setCategory("completed")}
        >
          Completed
        </li>
      </ul>
    </footer>
  );
};
