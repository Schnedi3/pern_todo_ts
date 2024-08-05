import "../css/taskform.css";

import { useTaskContext } from "../context/useTaskContext";

export const TaskForm = () => {
  const { newTask, handleOnSubmit, handleChange, addTask } = useTaskContext();

  return (
    <form className="task_form" onSubmit={handleOnSubmit}>
      <h1>todo</h1>
      <div className="input__container">
        <input
          placeholder="Add a new task"
          onChange={handleChange}
          value={newTask}
          autoFocus
        />
        <p onClick={addTask}>🡒</p>
      </div>
    </form>
  );
};
