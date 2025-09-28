import React, { createContext, useContext, useEffect, useState } from "react";
import { getData, updateData } from "../storage";
import { StorageKeys, User } from "../types";

type UserContextType = {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
    updateUserField: (field: keyof User, value: any) => Promise<void>;

};

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    refreshUser: async () => { },
    updateUserField: async (field, value) => { },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        setLoading(true);
        try {
            const storedUser = await getData<User>(StorageKeys.User);
            setUser(storedUser ?? null);
        } catch (err) {
            console.warn("Failed to load user:", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };


    const updateUserField = async (field: keyof User, value: any) => {
        const updatedUser = await updateData<User>(StorageKeys.User, { [field]: value });
        setUser(updatedUser); // تحديث الواجهة مباشرة
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, refreshUser: loadUser, updateUserField }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
