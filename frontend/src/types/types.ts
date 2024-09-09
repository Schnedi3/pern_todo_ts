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
