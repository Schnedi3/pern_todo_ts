import { useState } from "react";

import {
  completeTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from "../api/tasks";
import { IItemProps } from "../types/types";
import "../css/item.css";

export const TaskItem = ({
  todoList,
  setTodoList,
  filteredList,
}: IItemProps) => {
  const [editId, setEditId] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updatedText, setUpdatedText] = useState<string>("");

  const completeTask = async (id: number, completed: boolean) => {
    completed = !completed;

    try {
      const res = await completeTaskRequest(id, completed);
      setTodoList(todoList.map((task) => (task.id === id ? res.data : task)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (
    id: number,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      if (updatedText.trim() !== "") {
        const res = await updateTaskRequest(id, updatedText);
        setTodoList(todoList.map((task) => (task.id === id ? res.data : task)));
      }
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await deleteTaskRequest(id);
      setTodoList(todoList.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul className="list">
      {filteredList.length === 0 ? (
        <p className="empty">Nothing to do...</p>
      ) : (
        filteredList.map((task) => (
          <li className="task_container" key={task.id}>
            <input
              className="checkbox_task checkbox_border"
              type="checkbox"
              id={task.text}
              checked={task.completed}
              onChange={() => completeTask(task.id, task.completed)}
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
          </li>
        ))
      )}
    </ul>
  );
};
