import { TaskFooter } from "./TaskFooter";
import { useTaskContext } from "../context/useTaskContext";

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
              <input
                className="checkbox_task checkbox_border"
                type="checkbox"
                id={task.text}
                checked={task.completed}
                onChange={() => completedTask(task.id)}
              />
              {editMode && editId === task.id ? (
                <input
                  className="task_edit"
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
