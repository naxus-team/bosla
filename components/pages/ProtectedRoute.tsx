import React, { ReactNode } from "react";
import { View, ActivityIndicator } from "react-native";
import { Navigate } from "react-router-native";
import { useAuth } from "../hook/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loading, authorized } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!authorized) return <Navigate to="/login" replace />;
  if (authorized) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
