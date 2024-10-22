export interface IUser {
  id: number;
  email: string;
  password: string | null;
  google_id: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
