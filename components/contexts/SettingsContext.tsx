import React, { createContext, useContext, useEffect, useState } from "react";
import { getData, setData } from "../storage";

// نوع بيانات الإعدادات
export type AppSettings = {
    vibrationEnabled: boolean;
    notificationsEnabled: boolean;
    darkMode: boolean;
    language: string; // العربية أو الإنجليزية أو أي لغة أخرى
};

// مفتاح التخزين
const StorageKeys = {
    Settings: "settings",
};

// إعدادات افتراضية
const defaultSettings: AppSettings = {
    vibrationEnabled: true,
    notificationsEnabled: true,
    darkMode: false,
    language: "ar",
};

type SettingsContextType = {
    settings: AppSettings;
    updateSettings: (newSettings: Partial<AppSettings>) => void;
};

// إنشاء الـ Context
const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    updateSettings: () => { },
});

// دالة لتهيئة الإعدادات الافتراضية إذا لم توجد
async function initDefaultSettings(): Promise<AppSettings> {
    const stored = await getData<AppSettings>(StorageKeys.Settings);
    if (!stored) {
        await setData(StorageKeys.Settings, defaultSettings);
        return defaultSettings;
    }
    return { ...defaultSettings, ...stored };
}

// Provider
export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);

    useEffect(() => {
        (async () => {
            const initialSettings = await initDefaultSettings();
            setSettings(initialSettings);
        })();
    }, []);

    const updateSettings = (newSettings: Partial<AppSettings>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        setData(StorageKeys.Settings, updated);
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

// Hook للاستخدام
export const useSettings = () => useContext(SettingsContext);
