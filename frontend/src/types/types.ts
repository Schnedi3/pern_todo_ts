export interface TaskType {
  id: number;
  text: string;
  completed: boolean;
}

export interface TaskContextType {
  todoList: TaskType[];
  newTask: string;
  setNewTask: (newTask: string) => void;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getTasks: () => void;
  addTask: () => void;
  completeTask: (id: number, completed: boolean) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  editId: number | undefined;
  setEditId: (editId: number | undefined) => void;
  updatedText: string;
  setUpdatedText: (updatedText: string) => void;
  updateTask: (id: number) => void;
  deleteTask: (id: number) => void;
  category: string;
  setCategory: (category: string) => void;
  filteredTodoList: TaskType[];
  noActiveTasks: boolean;
  noCompletedTasks: boolean;
}

export interface RegisterType {
  username: string;
  email: string;
  password: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: RegisterType | LoginType | null;
  signup: (user: RegisterType) => Promise<void>;
  login: (user: LoginType) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  error: string | null;
}
