import "../css/list.css";

import { TaskFooter } from "./TaskFooter";
import { useTaskContext } from "../context/useTaskContext";

export const TaskList = () => {
  const { filteredTodoList, completedTask, deleteTask } = useTaskContext();

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
          <TaskFooter />
        </>
      )}
    </section>
  );
};
