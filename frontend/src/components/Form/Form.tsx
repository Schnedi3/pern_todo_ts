import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { addTaskRequest, getTasksRequest } from "../../api/task";
import { IFormProps } from "../../types/types";
import styles from "./form.module.css";

export const Form = ({ todoList, setTodoList }: IFormProps) => {
  const [newTask, setNewTask] = useState<string>("");

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask) {
      addTask();
    }
  };

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

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const { data } = await addTaskRequest(newTask);

        if (data.success) {
          setTodoList([...todoList, data.result]);
          setNewTask("");
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
    }
  };

  return (
    <form className={styles.form} onSubmit={handleOnSubmit}>
      <h1 className={styles.title}>todo</h1>
      <article className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          autoFocus
        />
        <span
          className={`${styles.span} ${newTask ? styles.iconClear : ""}`}
          onClick={() => setNewTask("")}
        >
          ✖
        </span>
      </article>
    </form>
  );
};
