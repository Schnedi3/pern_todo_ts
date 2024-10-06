import { useState } from "react";

import { TaskFooter, TaskForm, TaskItem } from "../Routes";
import { Task } from "../types/types";

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
