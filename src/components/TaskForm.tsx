import { useTaskContext } from "../context/useTaskContext";

import "../css/form.css";

export const TaskForm = () => {
  const { newTask, handleOnSubmit, handleChange } = useTaskContext();

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTask}
        onChange={handleChange}
        autoFocus
      />
    </form>
  );
};
