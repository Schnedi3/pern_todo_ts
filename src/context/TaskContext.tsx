import { createContext, PropsWithChildren, useState } from "react";
import { Task, TaskContextType } from "../types/types";

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider = ({ children }: PropsWithChildren) => {
  const [todoList, setTodoList] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [category, setCategory] = useState<string>("all");

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask) {
      addTask();
      setNewTask("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    const task: Task = {
      id: todoList.length + 1,
      text: newTask,
      completed: false,
    };
    if (!newTask) return;
    setTodoList([...todoList, task]);
    setNewTask("");
  };

  const completedTask = (id: number) => {
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  const filteredTodoList = todoList.filter((task) => {
    if (category === "active") {
      return !task.completed;
    }
    if (category === "completed") {
      return task.completed;
    }
    return task;
  });

  const noActiveTasks = todoList.some((task) => !task.completed);
  const noCompletedTasks = todoList.some((task) => task.completed);

  const deleteCompleted = () => {
    setTodoList(filteredTodoList.filter((task) => !task.completed));
  };

  return (
    <TaskContext.Provider
      value={{
        todoList,
        newTask,
        handleOnSubmit,
        handleChange,
        addTask,
        completedTask,
        deleteTask,
        category,
        setCategory,
        filteredTodoList,
        deleteCompleted,
        noActiveTasks,
        noCompletedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
