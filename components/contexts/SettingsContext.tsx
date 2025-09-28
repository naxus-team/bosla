import React, { createContext, useContext, useEffect, useState } from "react";
import { getData, setData } from "../storage";

type Settings = {
    vibrationEnabled: boolean;
    notificationsEnabled: boolean;
    darkMode: boolean;
};

type SettingsContextType = {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
};

const defaultSettings: Settings = {
    vibrationEnabled: true,
    notificationsEnabled: true,
    darkMode: false,
};

const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    updateSettings: () => { },
});

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState<Settings>(defaultSettings);

    // تحميل الإعدادات من التخزين
    useEffect(() => {
        (async () => {
            const stored = await getData<Settings>("settings");
            if (stored) {
                setSettings({ ...defaultSettings, ...stored });
            }
        })();
    }, []);

    // تحديث الإعدادات
    const updateSettings = (newSettings: Partial<Settings>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        setData("settings", updated);
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

// Hook للاستخدام
export const useSettings = () => useContext(SettingsContext);
