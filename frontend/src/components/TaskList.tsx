import "../css/list.css";

import { TaskFooter } from "./TaskFooter";
import { useTaskContext } from "../context/useTaskContext";

export const TaskList = () => {
  const {
    filteredTodoList,
    completeTask,
    editMode,
    setEditMode,
    editId,
    setEditId,
    updatedText,
    setUpdatedText,
    updateTask,
    deleteTask,
  } = useTaskContext();

  return (
    <ul className="list">
      {filteredTodoList.length === 0 ? (
        <p className="empty">Nothing to do...</p>
      ) : (
        <>
          {filteredTodoList.map((task, index) => (
            <li className="task__container" key={task.id || index}>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => completeTask(task.id, task.completed)}
                />
                <span className="check"></span>
              </label>
              {editMode && editId === task.id ? (
                <input
                  type="text"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                  onBlur={() => updateTask(task.id)}
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
              <p className="task__delete" onClick={() => deleteTask(task.id)}>
                ✖
              </p>
            </li>
          ))}
          <TaskFooter />
        </>
      )}
    </ul>
  );
};
