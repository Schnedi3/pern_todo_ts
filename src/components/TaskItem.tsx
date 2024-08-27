import { TaskFooter } from "./TaskFooter";
import { useTaskContext } from "../context/useTaskContext";

import iconCheck from "../assets/icon-check.svg";
import "../css/item.css";

export const TaskItem = () => {
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
            <div className="task_container" key={task.id}>
              <button
                className={task.completed ? "task_checked" : "task_unchecked"}
                onClick={() => completedTask(task.id)}
              >
                {task.completed && <img src={iconCheck} alt="task completed" />}
              </button>
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
                  className={task.completed ? "task_completed" : ""}
                  onDoubleClick={() => {
                    setEditMode(true),
                      setEditId(task.id),
                      setUpdatedText(task.text);
                  }}
                >
                  {task.text}
                </p>
              )}
              <p className="task_delete" onClick={() => deleteTask(task.id)}>
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
