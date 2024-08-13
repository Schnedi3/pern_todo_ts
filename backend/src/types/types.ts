export interface IUser {
  user_id: number;
  username: string;
  email: string;
  password: string;
}

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
