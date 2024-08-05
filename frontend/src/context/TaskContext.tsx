import { createContext, PropsWithChildren, useEffect, useState } from "react";
import axios from "axios";

import { TaskType, TaskContextType } from "../types/types";
import { API_URL } from "../api/api";

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

  // async function to get all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/tasks`);
        setTodoList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  // add the new task to the list
  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await axios.post(`${API_URL}/tasks`, {
          text: newTask,
        });
        setTodoList([...todoList, response.data]);
        setNewTask("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  // mark a task as completed
  const completedTask = async (id: string) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`);
      setTodoList(
        todoList.map((task) => (task._id === id ? response.data : task))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // update task
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [updatedText, setUpdatedText] = useState<string>("");

  const handleUpdate = async (id: string) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}/updated`, {
        text: updatedText,
      });
      setTodoList(
        todoList.map((task) => (task._id === id ? response.data : task))
      );
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  // delete any task
  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTodoList(todoList.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Filter tasks by category
  const [category, setCategory] = useState<string>("all");

  const filteredTodoList = todoList.filter((task) => {
    if (category === "active") return !task.completed;
    if (category === "completed") return task.completed;
    return task;
  });

  if (category === "completed" && filteredTodoList.length === 0) setCategory("all")

  // disable category button if there's no any task in that category
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
        completedTask,
        editMode,
        setEditMode,
        editId,
        setEditId,
        updatedText,
        setUpdatedText,
        handleUpdate,
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
