import { useTaskContext } from "../context/useTaskContext";

import iconAdd from "../assets/icon_add.svg";
import "../css/form.css";

export const TaskForm = () => {
  const { newTask, handleOnSubmit, handleChange, addTask } = useTaskContext();

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <h1>todo</h1>
      <div className="input__container">
        <input
          placeholder="Add a new task"
          onChange={handleChange}
          value={newTask}
          autoFocus={true}
        />
        <img src={iconAdd} alt="add task" onClick={addTask} />
      </div>
    </form>
  );
};
