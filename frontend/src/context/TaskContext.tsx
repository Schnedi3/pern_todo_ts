import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { TaskType, TaskContextType } from "../types/types";
import {
  addTaskRequest,
  getTasksRequest,
  completeTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from "../api/tasks";

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider = ({ children }: PropsWithChildren) => {
  const [todoList, setTodoList] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  // prevent default form submit
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask) {
      addTask();
      setNewTask("");
    }
  };

  // capture the input value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  // get tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasksRequest();
        setTodoList(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  // add task
  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const res = await addTaskRequest(newTask);
        setTodoList([...todoList, res.data]);
        setNewTask("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  // complete task
  const completeTask = async (id: string) => {
    try {
      const res = await completeTaskRequest(id);
      setTodoList(todoList.map((task) => (task._id === id ? res.data : task)));
    } catch (error) {
      console.error(error);
    }
  };

  // update task
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [updatedText, setUpdatedText] = useState<string>("");

  const updateTask = async (id: string) => {
    try {
      const res = await updateTaskRequest(id, updatedText);
      setTodoList(todoList.map((task) => (task._id === id ? res.data : task)));
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  // delete task
  const deleteTask = async (id: string) => {
    try {
      await deleteTaskRequest(id);
      setTodoList(todoList.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Filter tasks
  const [category, setCategory] = useState<string>("all");

  const filteredTodoList = todoList.filter((task) => {
    if (category === "active") return !task.completed;
    if (category === "completed") return task.completed;
    return task;
  });

  if (category === "completed" && filteredTodoList.length === 0)
    setCategory("all");

  // disable category button if's empty
  const noActiveTasks = todoList.some((task) => !task.completed);
  const noCompletedTasks = todoList.some((task) => task.completed);

  return (
    <TaskContext.Provider
      value={{
        todoList,
        newTask,
        handleOnSubmit,
        handleChange,
        addTask,
        completeTask,
        editMode,
        setEditMode,
        editId,
        setEditId,
        updatedText,
        setUpdatedText,
        updateTask,
        deleteTask,
        category,
        setCategory,
        filteredTodoList,
        noActiveTasks,
        noCompletedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
