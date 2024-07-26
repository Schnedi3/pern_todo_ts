import "../css/taskform.css";
import addPath from "../assets/add.svg";

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
        <span onClick={addTask}>
          <img src={addPath} alt="add task" />
        </span>
      </div>
    </form>
  );
};
