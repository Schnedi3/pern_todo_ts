// auth
export interface IAuthStore {
  user: IUser | null;
  isAuthenticated: boolean;
  authData: (data: IUser) => void;
  logoutAuth: () => void;
}

export interface IUser {
  email: string;
  password: string | null;
  google_id: string | null;
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
