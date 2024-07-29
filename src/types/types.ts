export interface ThemeContextType {
  theme: string;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  isEditing: boolean;
}

export interface TaskContextType {
  todoList: Task[];
  newTask: string;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
  completedTask: (id: number) => void;
  newText: string;
  setNewText: (newText: string) => void;
  handleEditTask: (id: number, text: string) => void;
  handleUpdate: (id: number) => void;
  deleteTask: (id: number) => void;
  category: string;
  setCategory: (category: string) => void;
  filteredTodoList: Task[];
  deleteCompleted: () => void;
  noActiveTasks: boolean;
  noCompletedTasks: boolean;
}
