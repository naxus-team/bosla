import { getData, setData } from "../storage";

// نوع بيانات الإعدادات
type AppSettings = {
    vibrationEnabled: boolean;
    darkMode: boolean;
    language: string;
    notifications: boolean;
};

// مفتاح التخزين
const StorageKeys = {
    Settings: "settings",
};

// دالة لإنشاء الإعدادات الافتراضية
export async function initDefaultSettings() {
    const settings = await getData<AppSettings>(StorageKeys.Settings);

    if (!settings) {
        const defaultSettings: AppSettings = {
            vibrationEnabled: true,
            darkMode: false,
            language: "en_us", // اللغة الافتراضية
            notifications: true,
        };

        await setData(StorageKeys.Settings, defaultSettings);
        return defaultSettings;
    }

    return settings;
}


export async function getCurrentSettings(): Promise<AppSettings> {
    return initDefaultSettings();
}