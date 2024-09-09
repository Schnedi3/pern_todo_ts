import { useState } from "react";

import { IItemProps } from "../types/types";
import "../css/item.css";

export const Item = ({ todoList, setTodoList, filteredList }: IItemProps) => {
  const [editId, setEditId] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updatedText, setUpdatedText] = useState<string>("");

  const completedTask = (id: number) => {
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleUpdate = (id: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            text: updatedText ? updatedText : task.text,
          };
        }
        return task;
      })
    );
    setEditMode(false);
  };

  const deleteTask = (id: number) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  return (
    <section className="list">
      {filteredList.length === 0 ? (
        <p className="empty">Nothing to do...</p>
      ) : (
        filteredList.map((task) => (
          <div className="task_container" key={task.id}>
            <input
              className="checkbox_task checkbox_border"
              type="checkbox"
              id={task.text}
              checked={task.completed}
              onChange={() => completedTask(task.id)}
            />
            {editMode && editId === task.id ? (
              <form onSubmit={(e) => handleUpdate(task.id, e)}>
                <input
                  className="task_edit"
                  type="text"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                  autoFocus
                />
              </form>
            ) : (
              <p className={task.completed ? "task_completed" : ""}>
                {task.text}
              </p>
            )}
            <span
              onClick={() => {
                setEditMode(true);
                setEditId(task.id);
                setUpdatedText(task.text);
              }}
            >
              ✎
            </span>
            <span onClick={() => deleteTask(task.id)}>✖</span>
          </div>
        ))
      )}
    </section>
  );
};
