import { TaskForm } from "../components/TaskForm";
import { TaskItem } from "../components/TaskItem";

export const Tasks = () => {
  return (
    <section className="main__container">
      <TaskForm />
      <TaskItem />
    </section>
  );
};
