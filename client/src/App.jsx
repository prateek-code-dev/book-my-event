import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import CreateEventsPage from "./pages/admin/CreateEventsPage";
import DisplayAllEventsPage from "./pages/admin/DisplayAllEventsPage";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/create-event"
                        element={<CreateEventsPage />}
                    />
                    <Route
                        path="/admin/all-event"
                        element={<DisplayAllEventsPage />}
                    />
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <RegisterPage />
                            </PublicRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
