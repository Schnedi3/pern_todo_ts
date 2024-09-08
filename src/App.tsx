import { Header } from "./components/Header";
import { Form } from "./components/Form";
import { Item } from "./components/Item";

import "./css/app.css";

export const App = () => {
  return (
    <main className="app">
      <figure className="header_image"></figure>
      <div className="todo container">
        <Header />
        <Form />
        <Item />
      </div>
    </main>
  );
};
