import Loading from "@/components/project-components/Loading";
import { showToast } from "@/helper/showToast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, userType }) => {
    const { _id, isAdmin } =
        useSelector((state) => state.auth?.data?.data) || {};
    const loading = useSelector((state) => state.auth.loading);
    const navigate = useNavigate();

    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const validateUser = async () => {
            if (!_id) {
                navigate("/login");
                showToast("error", "Unauthorized! Please log in.");
                return;
            }

            if (userType === "admin" && !isAdmin) {
                navigate("/login");
                showToast("error", "Unauthorized! Admin access required!");
                return;
            }

            try {
                const result = await axios.get(
                    `http://localhost:5500/v1/user/user-details/${_id}`,
                    { withCredentials: true }
                );

                if (!result.data.success) {
                    navigate("/login");
                    showToast("error", "Unauthorized! Invalid credentials!");
                }
            } catch (error) {
                console.error("User validation failed:", error);
                navigate("/login");
                showToast("error", "Unauthorized! Please log in.");
            } finally {
                setIsChecking(false);
            }
        };

        validateUser();
    }, [_id, isAdmin, userType, navigate]);

    if (loading || isChecking) {
        return <Loading />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
