// data/index.ts
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// Set Data
export function setData(key: string, value: any): void {
  try {
    const jsonValue = JSON.stringify(value);
    storage.set(key, jsonValue);
  } catch (e) {
    console.error("Error saving data", e);
  }
}

// Get Data
export function getData<T = any>(key: string): T | null {
  try {
    const jsonValue = storage.getString(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading data", e);
    return null;
  }
}

// Remove Cache
export function removeData(key: string): void {
  try {
    storage.delete(key);
  } catch (e) {
    console.error("Error removing data", e);
  }
}

// Remove Data
export function clearAll(): void {
  try {
    storage.clearAll();
  } catch (e) {
    console.error("Error clearing storage", e);
  }
}
