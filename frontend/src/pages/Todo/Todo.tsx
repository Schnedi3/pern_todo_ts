import { useState } from "react";

import { Footer, Form, Item, Logout } from "../../Routes";
import { ITask } from "../../types/types";
import styles from "./todo.module.css";

export const Todo = () => {
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [filteredList, setFilteredList] = useState<ITask[]>([]);

  return (
    <section className={styles.todo}>
      <Logout />
      <Form todoList={todoList} setTodoList={setTodoList} />
      <Item
        todoList={todoList}
        setTodoList={setTodoList}
        filteredList={filteredList}
      />
      <Footer todoList={todoList} setFilteredList={setFilteredList} />
      <p className={styles.reorderText}>Drag and drop to reorder list</p>
    </section>
  );
};
