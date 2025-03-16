import { showToast } from "@/helper/showToast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, userType }) => {
    const { _id, isAdmin } =
        useSelector((state) => state.auth?.data?.data) || {};

    // console.log("_id:", _id, "isAdmin:", isAdmin);

    const navigate = useNavigate();
    const [protectedPageAccess, setProtectedPageAccess] = useState(false);

    useEffect(() => {
        const validateUser = async () => {
            try {
                // If _id is not defined, user is not logged in, so redirect.
                if (!_id) {
                    navigate("/login");
                    showToast("error", "Unauthorized! Please log in.");
                    return;
                }

                if (userType === "admin" && !isAdmin) {
                    navigate("/login");
                    showToast("error", `Unauthorized! Admin access!`);
                    return;
                }

                const result = await axios.get(
                    `http://localhost:5500/v1/user/user-details/${_id}`,
                    { withCredentials: true }
                );

                if (!result.data.success) {
                    navigate("/login");
                    showToast("error", "Unauthorized! Invalid credentials!");
                    return;
                }

                // If all checks pass, allow access to the protected page.
                setProtectedPageAccess(true);
            } catch (error) {
                console.error("User validation failed:", error);
                navigate("/login");
                showToast("error", "Unauthorized! Please log in.");
            }
        };

        validateUser();
    }, [isAdmin, userType]);

    // Render children only if access is granted
    return <>{protectedPageAccess ? children : null}</>;
};

export default ProtectedRoute;
