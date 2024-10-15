// Auth
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

export interface IAuthResponse {
  success: boolean;
  message: string;
  result: {
    id: number;
    email: string;
    password: string | null;
    google_id: string | null;
  };
  token: string;
}

export interface IUser {
  email: string;
  password: string | null;
  google_id: string | null;
}

// Todos
export interface ITask {
  id: number;
  text: string;
  completed: boolean;
}

export interface ITodoStore {
  todos: ITask[];
  addTodo: (task: ITask) => void;
  completeTodo: (id: number, task: ITask) => void;
  deleteTodo: (id: number) => void;
  getTodos: (data: ITask[]) => void;
  updateTodo: (id: number, task: ITask) => void;
}

export interface IFooterProps {
  setFilteredList: (filteredList: ITask[]) => void;
}

export interface IItemProps {
  filteredList: ITask[];
}
