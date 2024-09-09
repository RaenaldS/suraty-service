import { DefaultSession, DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  /**
   * Role of user
   */
  id: string;
  role?: number;
  opd?: number | null;
  /**
   * Field to check whether a user has a subscription
   */
  username: string;
  email: string;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
