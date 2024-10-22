import { useState } from "react";

import { useCompleteTask, useDeleteTask, useUpdateTask } from "../../api/task";
import { ITask } from "../../types/types";
import { iconTrash } from "../../Routes";
import styles from "./item.module.css";

interface IItemProps {
  filteredList: ITask[];
}

export const Item = ({ filteredList }: IItemProps) => {
  const [editId, setEditId] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updatedText, setUpdatedText] = useState<string>("");

  const { mutate: updateTask } = useUpdateTask();
  const { mutate: completeTask } = useCompleteTask();
  const { mutate: deleteTask } = useDeleteTask();

  const handleCompleteTask = async (completed: boolean, id: number) => {
    completed = !completed;
    completeTask({ completed, id });
  };

  const handleUpdateTask = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    if (updatedText.trim() !== "") {
      updateTask(
        { updatedText, id },
        {
          onSuccess: () => {
            setEditMode(false);
          },
        }
      );
    }
  };

  if (!filteredList || filteredList?.length === 0) {
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
            onChange={() => handleCompleteTask(task.completed, task.id)}
          />
          {editMode && editId === task.id ? (
            <form onSubmit={(e) => handleUpdateTask(e, task.id)}>
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
