import { useState } from "react";

import { Footer, Form, Item } from "../../Routes";
import { Task } from "../../types/types";

export const Tasks = () => {
  const [todoList, setTodoList] = useState<Task[]>([]);
  const [filteredList, setFilteredList] = useState<Task[]>([]);

  return (
    <section className="main_container">
      <Form todoList={todoList} setTodoList={setTodoList} />
      <Item
        todoList={todoList}
        setTodoList={setTodoList}
        filteredList={filteredList}
      />
      <Footer todoList={todoList} setFilteredList={setFilteredList} />
      <p>Drag and drop to reorder list</p>
    </section>
  );
};
