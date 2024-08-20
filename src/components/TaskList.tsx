import { TaskFooter } from "./TaskFooter";
import { useTaskContext } from "../context/useTaskContext";

import iconDelete from "../assets/icon_delete.svg";
import "../css/list.css";

export const TaskList = () => {
  const {
    filteredTodoList,
    completedTask,
    deleteTask,
    editMode,
    setEditMode,
    editId,
    setEditId,
    updatedText,
    setUpdatedText,
    handleUpdate,
  } = useTaskContext();

  return (
    <section className="list">
      {filteredTodoList.length === 0 ? (
        <p className="empty">Nothing to do...</p>
      ) : (
        <>
          {filteredTodoList.map((task) => (
            <div className="task__container" key={task.id}>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => completedTask(task.id)}
                />
                <span className="check"></span>
              </label>
              {editMode && editId === task.id ? (
                <input
                  type="text"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                  onBlur={() => handleUpdate(task.id)}
                  autoFocus
                />
              ) : (
                <p
                  className={task.completed ? "task__completed" : ""}
                  onDoubleClick={() => {
                    setEditMode(true),
                      setEditId(task.id),
                      setUpdatedText(task.text);
                  }}
                >
                  {task.text}
                </p>
              )}
              <img
                src={iconDelete}
                className="task__delete"
                onClick={() => deleteTask(task.id)}
                alt="delete task"
              />
            </div>
          ))}
          <TaskFooter />
        </>
      )}
    </section>
  );
};
