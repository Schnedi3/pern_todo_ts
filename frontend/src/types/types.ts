export interface ThemeContextType {
  theme: string;
}

export interface TaskType {
  _id: string;
  text: string;
  completed: boolean;
  isEditing: boolean;
}

export interface TaskContextType {
  todoList: TaskType[];
  newTask: string;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
  completedTask: (id: string) => void;
  newText: string;
  setNewText:  (newText: string) => void;
  handleEditTask: (id: string, text: string) => void;
  handleUpdate: (id: string) => void;
  deleteTask: (id: string) => void;
  category: string;
  setCategory: (category: string) => void;
  filteredTodoList: TaskType[];
  deleteCompleted: () => void;
  noActiveTasks: boolean;
  noCompletedTasks: boolean;
}
