import "../css/tasklist.css";

import { useTaskContext } from "../context/useTaskContext";

export const TaskList = () => {
  const {
    filteredTodoList,
    completedTask,
    deleteTask,
    category,
    setCategory,
    deleteCompleted,
    noActiveTasks,
    noCompletedTasks,
  } = useTaskContext();

  return (
    <section className="task__list container">
      {filteredTodoList.length === 0 ? (
        <p className="empty">Nothing to do...</p>
      ) : (
        <>
          {filteredTodoList.map((task) => (
            <div className="task__container" key={task.id}>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => completedTask(task.id)}
                />
                <span className="check"></span>
              </label>
              <p className={task.completed ? "task__completed" : ""}>
                {task.text}
              </p>
              <p className="task__delete" onClick={() => deleteTask(task.id)}>
                ✖
              </p>
            </div>
          ))}
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
        </>
      )}
    </section>
  );
};
