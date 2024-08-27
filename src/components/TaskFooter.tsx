import { useTaskContext } from "../context/useTaskContext";

import "../css/footer.css";

export const TaskFooter = () => {
  const { todoList, category, setCategory, noActiveTasks, noCompletedTasks } =
    useTaskContext();

  const tasksLeft = todoList.filter((task) => !task.completed);

  return (
    <footer className="footer">
      <p>
        {tasksLeft.length} {tasksLeft.length > 1 ? "tasks" : "task"} left
      </p>
      <ul className="footer_cat">
        <li
          onClick={() => setCategory("all")}
          className={category === "all" ? "active" : ""}
        >
          All
        </li>
        <li
          onClick={() => setCategory("active")}
          className={category === "active" ? "active" : ""}
          id={!noActiveTasks ? "disable" : ""}
        >
          Active
        </li>
        <li
          onClick={() => setCategory("completed")}
          className={category === "completed" ? "active" : ""}
          id={!noCompletedTasks ? "disable" : ""}
        >
          Completed
        </li>
      </ul>
    </footer>
  );
};
