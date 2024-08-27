import { useTaskContext } from "../context/useTaskContext";

import "../css/form.css";

export const TaskForm = () => {
  const { newTask, handleOnSubmit, handleChange } = useTaskContext();

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <h1>todo</h1>
      <input
        className="input_container"
        placeholder="Add a new task"
        onChange={handleChange}
        value={newTask}
        autoFocus
      />
    </form>
  );
};
