export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface IFormProps {
  todoList: Task[];
  setTodoList: (todoList: Task[]) => void;
}

export interface IItemProps {
  todoList: Task[];
  setTodoList: (todoList: Task[]) => void;
  filteredList: Task[];
}

export interface IFooterProps {
  todoList: Task[];
  setFilteredList: (filteredList: Task[]) => void;
}
