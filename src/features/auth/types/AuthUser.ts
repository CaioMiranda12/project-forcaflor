export type AuthUser = {
  userId: string;
  nome: string;
  isAdmin: boolean;
  exp?: number;
  iat?: number;
};
