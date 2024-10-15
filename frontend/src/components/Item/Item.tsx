import { useCallback, useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { toast } from "react-toastify";

import {
  completeTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../../api/task";
import { IItemProps } from "../../types/types";
import { iconTrash } from "../../Routes";
import styles from "./item.module.css";

export const Item = ({ todoList, setTodoList, filteredList }: IItemProps) => {
  const [editId, setEditId] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updatedText, setUpdatedText] = useState<string>("");

  const getTasks = useCallback(async () => {
    try {
      const { data } = await getTasksRequest();

      if (data.success) {
        setTodoList(data.result);
      } else {
        console.log(data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  }, [setTodoList]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const updateTask = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    try {
      if (updatedText.trim() !== "") {
        const { data } = await updateTaskRequest(updatedText, id);

        if (data.success) {
          setTodoList(
            todoList.map((task) => (task.id === id ? data.result : task))
          );
          toast.success(data.message);
          setEditMode(false);
        } else {
          console.log(data.message);
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

  const completeTask = async (completed: boolean, id: number) => {
    completed = !completed;

    try {
      const { data } = await completeTaskRequest(completed, id);

      if (data.success) {
        setTodoList(
          todoList.map((task) => (task.id === id ? data.result : task))
        );
      } else {
        console.log(data.message);
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
      const { data } = await deleteTaskRequest(id);

      if (data.success) {
        setTodoList(todoList.filter((task) => task.id !== id));
        toast.success(data.message);
      } else {
        console.log(data.message);
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
      <section className={styles.empty}>
        <p className={styles.emptyText}>No pending tasks</p>
      </section>
    );
  }

  return (
    <Reorder.Group axis="y" values={todoList} onReorder={setTodoList}>
      {filteredList.map((task) => (
        <Reorder.Item className={styles.tasks} key={task.id} value={task}>
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
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};
