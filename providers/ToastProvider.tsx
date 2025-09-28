import React, { createContext, useContext, useState, ReactNode } from "react";
import { Animated, StyleSheet, Text, View, Dimensions } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { Fonts } from "../components/utils/font";

type ToastType = "success" | "error" | "info";
const { width } = Dimensions.get("window");

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextProps {
    notify: (message: string, options?: { type?: ToastType; duration?: number }) => void;
}

const MAX_TOASTS = 5;

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used inside ToastProvider");
    return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const notify = (message: string, options?: { type?: ToastType; duration?: number }) => {
        const id = Date.now();
        const type = options?.type || "info";
        const duration = options?.duration || 2000;

        setToasts((prev) => {
            const updated = [...prev, { id, message, type }];
            if (updated.length > MAX_TOASTS) {
                updated.shift();
            }
            return updated;
        });

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    };

    return (
        <ToastContext.Provider value={{ notify }}>
            {children}
            <View style={styles.container} pointerEvents="none">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} message={toast.message} type={toast.type} />
                ))}
            </View>
        </ToastContext.Provider>
    );
};

const ToastItem = ({ message, type }: { message: string; type: ToastType }) => {
    const [opacity] = useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
        return () => {
            Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start();
        };
    }, []);

    const background = type === "success" ? "#4CAF50" : type === "error" ? "#F44336" : "rgba(24,24,24,1)";

    return (
        <Animated.View style={[styles.toast, { backgroundColor: background, opacity }]}>
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 86,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    toast: {
        justifyContent: "center",
        marginVertical: 4,
        paddingHorizontal: 16,
        height: 32,
        borderRadius: 24,
        alignItems: "center",
        overflow: "hidden"
    },
    text: {
        color: "#fff",
        fontSize: 14,
        lineHeight: 20,
        textAlign: "center",
        fontFamily: Fonts["medium"]
    },
});
