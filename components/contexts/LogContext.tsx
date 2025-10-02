import React, { createContext, useContext, useState, useEffect } from "react";
import { setData, getData } from "../storage";

// نوع السجل
export type LogEntry = {
    id: string;
    type: "info" | "warning" | "error";
    from: string;
    message: string;
    timestamp: number;
    date: string;
    time: string;
};

// نوع السياق
type LogContextType = {
    logs: LogEntry[];
    addLog: (log: Omit<LogEntry, "id" | "timestamp" | "date" | "time">) => void;
    clearLogs: () => void;
};

// سياق
const LogContext = createContext<LogContextType>({
    logs: [],
    addLog: () => { },
    clearLogs: () => { },
});

// Helper: صياغة التاريخ والوقت
function formatDateTime(ts: number) {
    const d = new Date(ts);
    const date = d.toISOString().split("T")[0]; // yyyy-mm-dd
    const time = d.toTimeString().split(" ")[0]; // hh:mm:ss
    return { date, time };
}

// Provider
export const LogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // تحميل السجلات من MMKV عند بدء التشغيل
    useEffect(() => {
        (async () => {
            const stored = await getData<LogEntry[]>("logs");
            if (stored) setLogs(stored);
        })();
    }, []);

    // حفظ أي تحديث
    useEffect(() => {
        setData("logs", logs);
    }, [logs]);

    // إضافة سجل جديد
    const addLog = (log: Omit<LogEntry, "id" | "timestamp" | "date" | "time">) => {
        const ts = Date.now();
        const { date, time } = formatDateTime(ts);

        const newLog: LogEntry = {
            ...log,
            id: `${ts}-${Math.random()}`,
            timestamp: ts,
            date,
            time,
        };

        setLogs(prev => [newLog, ...prev]);
    };

    // مسح الكل
    const clearLogs = () => {
        setLogs([]);
        setData("logs", []);
    };

    return (
        <LogContext.Provider value={{ logs, addLog, clearLogs }}>
            {children}
        </LogContext.Provider>
    );
};

// Hook
export const useLog = () => useContext(LogContext);
