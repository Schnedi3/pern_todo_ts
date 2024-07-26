import "../css/tasklist.css";
import deletePath from "../assets/add.svg";

import { useTaskContext } from "../context/useTaskContext";

export const TaskList = () => {
  const { todoList, completedTask, deleteTask } = useTaskContext();

  return (
    <section className="task__list container">
      {todoList.map((task) => (
        <div className="task__container" key={task.id}>
          <label className="checkbox" onClick={() => completedTask(task.id)}>
            <input type="checkbox" />
            <span className="check"></span>
          </label>
          <p id={task.completed ? "task__completed" : ""}>{task.text}</p>
          <img
            src={deletePath}
            onClick={() => deleteTask(task.id)}
            className="task__delete"
          />
        </div>
      ))}
    </section>
  );
};
