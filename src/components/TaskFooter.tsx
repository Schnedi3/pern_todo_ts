import { useTaskContext } from "../context/useTaskContext";

import "../css/footer.css";

export const TaskFooter = () => {
  const { category, setCategory, noActiveTasks, noCompletedTasks } =
    useTaskContext();

  return (
    <footer className="footer">
      <ul className="footer__cat">
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
