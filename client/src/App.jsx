import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import CreateEventsPage from "./pages/admin/CreateEventsPage";
import DisplayAllEventsPage from "./pages/admin/DisplayAllEventsPage";
import EditEventsPage from "./pages/admin/EditEventsPage";
import Layout from "./Layout/Layout.jsx";
import EventDetailsPage from "./pages/EventDetailsPage";
import BookingPage from "./pages/BookingPage";
import ReportsPage from "./pages/admin/ReportsPage";
import UsersPage from "./pages/admin/UsersPage";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
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

                    {/* With Layout */}
                    <Route path="/" element={<Layout />}>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <HomePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/event/:id"
                            element={
                                <ProtectedRoute>
                                    <EventDetailsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/booking"
                            element={
                                <ProtectedRoute>
                                    <BookingPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/create-event"
                            element={
                                <ProtectedRoute userType="admin">
                                    <CreateEventsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/all-event"
                            element={
                                <ProtectedRoute userType="admin">
                                    <DisplayAllEventsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/edit-event/:id"
                            element={
                                <ProtectedRoute>
                                    <EditEventsPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/report"
                            element={
                                <ProtectedRoute userType="admin">
                                    <ReportsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/user"
                            element={
                                <ProtectedRoute userType="admin">
                                    <UsersPage />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    <Route path="*" element={<div>404, Please login</div>} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
