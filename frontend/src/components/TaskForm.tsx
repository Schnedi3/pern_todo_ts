import "../css/taskform.css";

import { useTaskContext } from "../context/useTaskContext";

export const TaskForm = () => {
  const { newTask, setNewTask, handleOnSubmit, handleChange } =
    useTaskContext();

  return (
    <form className="task_form" onSubmit={handleOnSubmit}>
      <h1>todo</h1>
      <article className="input_continer">
        <input
          placeholder="Add a new task"
          onChange={handleChange}
          value={newTask}
          autoFocus
        />
        <span
          className={newTask ? "clear_icon-show" : ""}
          onClick={() => setNewTask("")}
        >
          ✖
        </span>
      </article>
    </form>
  );
};
