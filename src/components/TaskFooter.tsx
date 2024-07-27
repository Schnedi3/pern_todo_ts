import "../css/footer.css";

import { useTaskContext } from "../context/useTaskContext";

export const TaskFooter = () => {
  const {
    category,
    setCategory,
    deleteCompleted,
    noActiveTasks,
    noCompletedTasks,
  } = useTaskContext();

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
      <p
        className="footer__clear"
        onClick={deleteCompleted}
        id={!noCompletedTasks ? "disable" : ""}
      >
        Clear Completed
      </p>
    </footer>
  );
};
