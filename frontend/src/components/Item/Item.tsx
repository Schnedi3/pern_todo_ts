import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useTodoStore } from "../../store/todoStore";
import {
  completeTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../../api/task";
import { IItemProps } from "../../types/types";
import { iconTrash } from "../../Routes";
import styles from "./item.module.css";

export const Item = ({ filteredList }: IItemProps) => {
  const [editId, setEditId] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updatedText, setUpdatedText] = useState<string>("");
  const { completeTodo, deleteTodo, getTodos, updateTodo } = useTodoStore();

  const getTasks = useCallback(async () => {
    try {
      const { data } = await getTasksRequest();

      if (!data.success) {
        console.log(data.message);
      }

      getTodos(data.result);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  }, [getTodos]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const completeTask = async (completed: boolean, id: number) => {
    completed = !completed;

    try {
      const { data } = await completeTaskRequest(completed, id);

      if (!data.success) {
        console.log(data.message);
      }

      completeTodo(id, data.result);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const { data } = await deleteTaskRequest(id);

      if (!data.success) {
        console.log(data.message);
      }

      deleteTodo(id);
      toast.success(data.message);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  const updateTask = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    try {
      if (updatedText.trim() !== "") {
        const { data } = await updateTaskRequest(updatedText, id);

        if (!data.success) {
          console.log(data.message);
        }

        updateTodo(id, data.result);
        toast.success(data.message);
        setEditMode(false);
      }
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  if (filteredList.length === 0) {
    return (
      <section className={styles.empty}>
        <p className={styles.emptyText}>No pending tasks</p>
      </section>
    );
  }

  return (
    <ul>
      {filteredList.map((task) => (
        <li className={styles.tasks} key={task.id}>
          <input
            className={`${styles.checkbox} ${styles.checkboxBorder}`}
            type="checkbox"
            id={task.text}
            checked={task.completed}
            onChange={() => completeTask(task.completed, task.id)}
          />
          {editMode && editId === task.id ? (
            <form onSubmit={(e) => updateTask(e, task.id)}>
              <input
                className={styles.edit}
                type="text"
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
                autoFocus
              />
            </form>
          ) : (
            <p
              className={`${styles.taskText} ${
                task.completed ? styles.taskCompleted : ""
              }`}
              onDoubleClick={() => {
                setEditMode(true),
                  setEditId(task.id),
                  setUpdatedText(task.text);
              }}
            >
              {task.text}
            </p>
          )}
          <button className={styles.button} onClick={() => deleteTask(task.id)}>
            <img className={styles.icon} src={iconTrash} alt="delete task" />
          </button>
        </li>
      ))}
    </ul>
  );
};
