import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./modules/auth/hooks/useAuth";
import ProtectedRoute from "./modules/Routes/ProtectedRoute";
import LoginForm from "./modules/auth/components/LoginForm";
import Layout from "./modules/layout/Layout";
import Home from "./modules/home/components/Home";
import Contact from "./modules/contact/components/Contact";
import EmployeeList from "./modules/employees/components/EmployeeList";
import ProductList from "./modules/products/components/ProductList";
import Profile from "./modules/auth/components/Profile";
import Cart from "./modules/cart/components/Cart";
import ErrorBoundary from "./modules/core/ErrorBoundary";
import { CartProvider } from "./modules/cart/hooks/useCart";

const App = () => {
    const { isAuthenticated } = useAuth();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />, // Removed cartItems and setCartItems props
            children: [
                { path: "", element: <ProtectedRoute><Home /></ProtectedRoute> },
                { path: "contact", element: <ProtectedRoute><Contact /></ProtectedRoute> },
                { path: "employees", element: <ProtectedRoute><EmployeeList /></ProtectedRoute> },
                { path: "products", element: <ProtectedRoute><ProductList /></ProtectedRoute> },
                { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
                { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
                { path: "login", element: <LoginForm /> },
            ],
        },
    ]);

    return (
        <ErrorBoundary>
            <CartProvider>
                <RouterProvider router={router} />
            </CartProvider>
        </ErrorBoundary>
    );
};

export default App;
