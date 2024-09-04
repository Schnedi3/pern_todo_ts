import "../css/taskform.css";

import { useTaskContext } from "../context/useTaskContext";

export const TaskForm = () => {
  const { newTask, handleOnSubmit, handleChange } = useTaskContext();

  return (
    <form className="task_form" onSubmit={handleOnSubmit}>
      <h1>todo</h1>
      <input
        className="input"
        placeholder="Add a new task"
        onChange={handleChange}
        value={newTask}
        autoFocus
      />
    </form>
  );
};
