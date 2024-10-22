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

// todos
export interface ITask {
  id: number;
  text: string;
  completed: boolean;
}
