import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export async function setData<T>(key: string, value: T): Promise<void> {
  const jsonValue = JSON.stringify(value);
  storage.set(key, jsonValue);
}

export async function getData<T>(key: string): Promise<T | null> {
  const jsonValue = storage.getString(key);
  return jsonValue ? (JSON.parse(jsonValue) as T) : null;
}

// export async function removeData(key: string): Promise<void> {
//   storage.delete(key);
// }

export async function updateData<T extends object>(key: string, partialValue: Partial<T>): Promise<T> {
  const existing = (await getData<T>(key)) || ({} as T);
  const updated = { ...existing, ...partialValue };
  await setData(key, updated);
  return updated;
}

export async function hasData(key: string): Promise<boolean> {
  return storage.contains(key);
}

// export async function clearAll(): Promise<void> {
//   storage.clearAll();
// }
