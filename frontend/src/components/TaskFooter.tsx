import { useEffect, useState } from "react";

import { IFooterProps } from "../types/types";
import "../css/footer.css";

export const TaskFooter = ({ todoList, setFilteredList }: IFooterProps) => {
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
    <footer className="footer">
      <p>
        {tasksLeft.length} {tasksLeft.length > 1 ? "tasks" : "task"} left
      </p>
      <ul className="categories">
        <li
          onClick={() => setCategory("all")}
          className={category === "all" ? "active" : ""}
          id={noTasks ? "disabled" : ""}
        >
          All
        </li>
        <li
          onClick={() => setCategory("active")}
          className={category === "active" ? "active" : ""}
          id={!noActiveTasks ? "disabled" : ""}
        >
          Active
        </li>
        <li
          onClick={() => setCategory("completed")}
          className={category === "completed" ? "active" : ""}
          id={!noCompletedTasks ? "disabled" : ""}
        >
          Completed
        </li>
      </ul>
    </footer>
  );
};
