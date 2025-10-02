export type User = {
  clientId: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  dial: string;
  phone: string;
  avatar?: string;
  bio: string;
  role: "user" | "admin";
  verify: boolean;
  createdAt: string; // ISO date
};

export enum StorageKeys {
  Token = "token",
  User = "user",
}

export type Step = {
  section: string;
  sub?: string;
};

export const reversePhone = (phone: string) => phone.split("").reverse().join("");

export function formatPhoneWithSpace(number: string): string {
  const clean = number.replace(/\s+/g, "");
  const prefix = clean.slice(0, 3);    // +20
  const first = clean.slice(3, 5);     // 10
  const rest = clean.slice(5);         // 00000000
  return `${prefix} ${first} ${rest}`;
}