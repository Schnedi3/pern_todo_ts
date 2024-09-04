import "../css/footer.css";

import { useTaskContext } from "../context/useTaskContext";

export const TaskFooter = () => {
  const { todoList, category, setCategory, noActiveTasks, noCompletedTasks } =
    useTaskContext();

  const tasksLeft = todoList.filter((task) => !task.completed);

  return (
    <footer className="footer">
      <p>
        {tasksLeft.length} {tasksLeft.length > 1 ? "tasks" : "task"} left
      </p>
      <ul className="categories">
        <li
          onClick={() => setCategory("all")}
          className={category === "all" ? "active" : ""}
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
