import "../css/list.css";

import { TaskFooter } from "./TaskFooter";
import { useTaskContext } from "../context/useTaskContext";

export const TaskList = () => {
  const {
    filteredTodoList,
    completedTask,
    newText,
    setNewText,
    handleEditTask,
    handleUpdate,
    deleteTask,
  } = useTaskContext();

  return (
    <section className="list">
      {filteredTodoList.length === 0 ? (
        <p className="empty">Nothing to do...</p>
      ) : (
        <>
          {filteredTodoList.map((task) => (
            <div className="task__container" key={task._id}>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => completedTask(task._id)}
                />
                <span className="check"></span>
              </label>
              {task.isEditing ? (
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  onBlur={() => handleUpdate(task._id)}
                  autoFocus
                />
              ) : (
                <p
                  className={task.completed ? "task__completed" : ""}
                  onDoubleClick={() => handleEditTask(task._id, task.text)}
                >
                  {task.text}
                </p>
              )}
              <p className="task__delete" onClick={() => deleteTask(task._id)}>
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
