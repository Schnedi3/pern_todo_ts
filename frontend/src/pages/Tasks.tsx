import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

export const Tasks = () => {
  return (
    <section className="main__container">
      <TaskForm />
      <TaskList />
    </section>
  );
};
