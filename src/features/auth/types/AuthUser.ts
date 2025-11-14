export type AuthUser = {
  userId: string;
  nome: string;
  isAdmin: boolean;
  email: string;
  exp?: number;
  iat?: number;
};
