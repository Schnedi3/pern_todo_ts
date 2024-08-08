export interface TaskType {
  _id: string;
  text: string;
  completed: boolean;
}

export interface TaskContextType {
  todoList: TaskType[];
  newTask: string;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
  completeTask: (id: string) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  editId: string;
  setEditId: (editId: string) => void;
  updatedText: string;
  setUpdatedText: (updatedText: string) => void;
  updateTask: (id: string) => void;
  deleteTask: (id: string) => void;
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
  isAuthenticated: boolean ;
  setIsAuthenticated: (isAuthenticated: boolean) => void ;
  error: string | null;
}

