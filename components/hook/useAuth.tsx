// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { getData } from "../storage";
import axios from "axios";
import { API_URL } from "../../config";

export function useAuth() {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await getData("token"); // لازم await
                if (!token) {
                    setAuthorized(false);
                    return;
                }

                // const res = await axios.get<{ status: boolean }>(`${API_URL}/auth`, {
                //     headers: { Authorization: `Bearer ${token}` },
                // });

                setAuthorized(true);
            } catch (err) {
                console.error("Auth check failed:", err);
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { loading, authorized };
}
