export interface ThemeContextType {
  theme: string;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface TaskContextType {
  todoList: Task[];
  newTask: string;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
  completedTask: (id: number) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  editId: number;
  setEditId: (editId: number) => void;
  updatedText: string;
  setUpdatedText: (updatedText: string) => void;
  handleUpdate: (id: number) => void;
  deleteTask: (id: number) => void;
  category: string;
  setCategory: (category: string) => void;
  filteredTodoList: Task[];
  noActiveTasks: boolean;
  noCompletedTasks: boolean;
}
