import { useState } from "react";

import { Footer, Form, Item, Logout } from "../../Routes";
import { ITask } from "../../types/types";
import styles from "./todo.module.css";

export const Todo = () => {
  const [filteredList, setFilteredList] = useState<ITask[]>([]);

  return (
    <section className={styles.todo}>
      <Logout />
      <Form />
      <Item filteredList={filteredList} />
      <Footer setFilteredList={setFilteredList} />
    </section>
  );
};
