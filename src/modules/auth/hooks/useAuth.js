import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Initialize `isAuthenticated` from localStorage on app load
    useEffect(() => {
        const checkAuthState = () => {
            console.log("Checking authentication state...");
            setIsLoading(true);
            const token = localStorage.getItem("token");
            console.log("Token in localStorage:", token);
            if (token) {
                try {
                    const userData = JSON.parse(atob(token.split(".")[1]));
                    const currentTime = Math.floor(Date.now() / 1000);
                    if (userData.exp > currentTime) {
                        console.log("Token is valid. User data:", userData);
                        setIsAuthenticated(true);
                        setUser(userData);
                    } else {
                        console.warn("Token has expired.");
                        localStorage.removeItem("token");
                        setIsAuthenticated(false);
                    }
                } catch (e) {
                    console.error("Invalid token format:", e);
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                }
            } else {
                console.log("No token found in localStorage.");
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        };

        checkAuthState();
    }, []);

    const signIn = async (username, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.signIn(username, password);
            localStorage.setItem("token", JSON.stringify(response.token));
            const userData = JSON.parse(atob(response.token.split(".")[1]));
            setIsAuthenticated(true);
            setUser(userData);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ signIn, signOut, isLoading, error, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};