// Auth
export interface IAuthStore {
  isAuthenticated: boolean;
  user: IUser | null;
  authData: (data: IAuthResponse) => void;
  logoutAuth: () => void;
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
