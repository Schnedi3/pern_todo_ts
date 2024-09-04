import "../css/item.css";

import { TaskFooter } from "./TaskFooter";
import { useTaskContext } from "../context/useTaskContext";

import iconCheck from "../assets/icons/check.svg";

export const TaskItem = () => {
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
              <input
                type="checkbox"
                id={task.text}
                checked={task.completed}
                onChange={() => completeTask(task.id, task.completed)}
              />
              <label htmlFor={task.text} className="label">
                <img src={iconCheck} />
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
              <span onClick={() => deleteTask(task.id)}>✖</span>
            </li>
          ))}
          <TaskFooter />
        </>
      )}
    </ul>
  );
};
