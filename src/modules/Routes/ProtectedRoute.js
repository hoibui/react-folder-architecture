import React from 'react';
import { useAuth } from "../auth/hooks/useAuth";
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Add debugging logs to verify the current location and authentication state
    console.log("ProtectedRoute - Current Location:", location.pathname);
    console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
    console.log("ProtectedRoute - isLoading:", isLoading);

    if (isLoading) {
        // Render a placeholder while authentication state is being determined
        return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
