export type User = {
  clientId: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  avatar?: string;
  bio?: string;
  role: "user" | "admin";
  verify: boolean;
  createdAt: string; // ISO date
};

export enum StorageKeys {
  Token = "token",
  User = "user",
}
