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

export interface AuthType {
  username: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  setUsername: (username: string) => void ;
  setEmail: (email: string) => void ;
  setPassword: (password: string) => void ;
  error: {message: string} |null;
  setError: (error: {message: string} |null) => void ;
  hasAccount: boolean ;
  setHasAccount: (hasAccount: boolean ) => void ;
  isAuthenticated: boolean ;
  setIsAuthenticated: (isAuthenticated: boolean) => void ;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void ;
}
