export type AuthUser = {
  userId: string;
  name: string;
  isAdmin: boolean;
  email: string;
  exp?: number;
  iat?: number;
};
