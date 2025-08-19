import { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token"); // 👈 خد التوكن من التخزين
        if (!token) {
          setAuthorized(false);
          return;
        }

        const res = await axios.get("http://192.168.1.3:8000/v1/auth", {
          headers: { Authorization: `Bearer ${token}` }, // 👈 ابعته للسيرفر
        });

        if (res.data.status === true) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/login" replace />;

  // ✅ لو مستخدم مسجل دخول يدخل على الصفحة المطلوبة
  return children;
};

export default ProtectedRoute;