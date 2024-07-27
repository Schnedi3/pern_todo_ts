import "../css/taskform.css";

import { useTaskContext } from "../context/useTaskContext";

export const TaskForm = () => {
  const { newTask, handleChange, addTask } = useTaskContext();

  return (
    <form className="form container">
      <h1>todo</h1>
      <div className="input__container">
        <input
          placeholder="Add a new task"
          onChange={handleChange}
          value={newTask}
          autoFocus={true}
        />
        <p onClick={addTask}>🡒</p>
      </div>
    </form>
  );
};
