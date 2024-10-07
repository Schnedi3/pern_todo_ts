export interface AuthContextType {
  user: IRegister | ILogin | null;
  loginGoogle: () => void;
  loginUser: (user: ILogin) => void;
  registerUser: (user: IRegister) => void;
  resetPassword: (user: ILogin) => void;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
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
