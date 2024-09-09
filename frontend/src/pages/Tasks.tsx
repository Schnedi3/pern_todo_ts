import { useState } from "react";

import { Task } from "../types/types";

import { TaskForm } from "../components/TaskForm";
import { TaskItem } from "../components/TaskItem";
import { TaskFooter } from "../components/TaskFooter";

export const Tasks = () => {
  const [todoList, setTodoList] = useState<Task[]>([]);
  const [filteredList, setFilteredList] = useState<Task[]>([]);

  return (
    <section className="main_container">
      <TaskForm todoList={todoList} setTodoList={setTodoList} />
      <TaskItem
        todoList={todoList}
        setTodoList={setTodoList}
        filteredList={filteredList}
      />
      <TaskFooter todoList={todoList} setFilteredList={setFilteredList} />
    </section>
  );
};
