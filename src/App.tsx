import { useState } from "react";

import { Task } from "./types/types";
import { Header } from "./components/Header";
import { Form } from "./components/Form";
import { Item } from "./components/Item";
import { Footer } from "./components/Footer";

import "./css/app.css";

export const App = () => {
  const [todoList, setTodoList] = useState<Task[]>([]);
  const [filteredList, setFilteredList] = useState<Task[]>([]);

  return (
    <main className="app">
      <figure className="header_image"></figure>
      <div className="todo container">
        <Header />
        <Form todoList={todoList} setTodoList={setTodoList} />
        <Item
          todoList={todoList}
          setTodoList={setTodoList}
          filteredList={filteredList}
        />
        <Footer todoList={todoList} setFilteredList={setFilteredList} />
      </div>
    </main>
  );
};
