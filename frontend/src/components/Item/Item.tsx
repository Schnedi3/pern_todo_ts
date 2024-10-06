import { useState } from "react";
import { Reorder } from "framer-motion";
import { toast } from "react-toastify";

import {
  completeTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from "../../api/task";
import { IItemProps } from "../../types/types";
import { iconEdit, iconTrash } from "../../Routes";
import "./item.css";

export const Item = ({
  todoList,
  setTodoList,
  filteredList,
}: IItemProps) => {
  const [editId, setEditId] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updatedText, setUpdatedText] = useState<string>("");

  const completeTask = async (completed: boolean, id: number) => {
    completed = !completed;

    try {
      const response = await completeTaskRequest(completed, id);

      if (response.data.success) {
        setTodoList(
          todoList.map((task) => (task.id === id ? response.data.result : task))
        );
      } else {
        console.log(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    try {
      if (updatedText.trim() !== "") {
        const response = await updateTaskRequest(updatedText, id);

        if (response.data.success) {
          setTodoList(
            todoList.map((task) =>
              task.id === id ? response.data.result : task
            )
          );
          toast.success(response.data.message);
        } else {
          console.log(response.data.message);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await deleteTaskRequest(id);

      if (response.data.success) {
        setTodoList(todoList.filter((task) => task.id !== id));
      } else {
        console.log(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  if (filteredList.length === 0) {
    return (
      <section className="empty">
        <p>No pending tasks</p>
      </section>
    );
  }

  return (
    <Reorder.Group
      axis="y"
      values={todoList}
      onReorder={setTodoList}
      className="list"
    >
      {filteredList.map((task) => (
        <Reorder.Item className="task_container" key={task.id} value={task}>
          <input
            className="checkbox_task checkbox_border"
            type="checkbox"
            id={task.text}
            checked={task.completed}
            onChange={() => completeTask(task.completed, task.id)}
          />
          {editMode && editId === task.id ? (
            <form onSubmit={(e) => handleUpdate(e, task.id)}>
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
          <button
            onClick={() => {
              setEditMode(true);
              setEditId(task.id);
              setUpdatedText(task.text);
            }}
          >
            <img src={iconEdit} alt="edit text" />
          </button>
          <button onClick={() => deleteTask(task.id)}>
            <img src={iconTrash} alt="delete task" />
          </button>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};
