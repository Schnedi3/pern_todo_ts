import { useState } from "react";

import { Footer, Form, Item } from "../../Routes";
import { ITask } from "../../types/types";

export const Todo = () => {
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [filteredList, setFilteredList] = useState<ITask[]>([]);

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
