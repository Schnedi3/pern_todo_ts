export interface AuthContextType {
  user: IRegister | ILogin | null;
  signup: (user: IRegister) => Promise<void>;
  login: (user: ILogin) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  error: string | null;
}

export interface IFormProps {
  todoList: Task[];
  setTodoList: (todoList: Task[]) => void;
}

export interface IFooterProps {
  todoList: Task[];
  setFilteredList: (filteredList: Task[]) => void;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  username: string;
  email: string;
  password: string;
}

export interface IItemProps {
  todoList: Task[];
  setTodoList: (todoList: Task[]) => void;
  filteredList: Task[];
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}
