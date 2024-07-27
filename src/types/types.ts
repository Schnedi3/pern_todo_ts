export interface ThemeContextType {
  theme: string;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface TaskContextType {
  todoList: Task [];
  newTask: string;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
  completedTask: (id: number) => void;
  deleteTask: (id: number) => void;
}
