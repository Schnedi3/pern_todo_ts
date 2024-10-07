export interface AuthContextType {
  user: IUser | null;
  loginGoogle: () => void;
  loginUser: (user: IUser) => void;
  registerUser: (user: IUser) => void;
  resetPassword: (user: IUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export interface IFormProps {
  todoList: ITask[];
  setTodoList: (todoList: ITask[]) => void;
}

export interface IFooterProps {
  todoList: ITask[];
  setFilteredList: (filteredList: ITask[]) => void;
}

export interface IItemProps {
  todoList: ITask[];
  setTodoList: (todoList: ITask[]) => void;
  filteredList: ITask[];
}

export interface ITask {
  id: number;
  text: string;
  completed: boolean;
}

export interface IUser {
  email: string;
  password: string;
}
