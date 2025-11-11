import { DefaultSession, DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  id: number | string;
  name: string;
  surname: string;
  accessToken: string;
  refreshToken: string;
  tenantId: number | string;
  userType?: number | string;
  userHash?: string;
  encryptedAccessToken?: string;
  expireTime: number
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
