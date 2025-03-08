import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eventsImage from "../assets/eventsImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import { loginDispatchFunction } from "@/redux/slices/authSlice";
import { showToast } from "@/helper/showToast";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email || !password) {
            alert(`All fields are required!`);
        }

        // console.log("formData", formData);

        try {
            const response = await dispatch(
                loginDispatchFunction(formData)
            ).unwrap();

            if (response.success) {
                navigate("/login");
            }
            showToast("success", `Welcome`);
        } catch (error) {
            showToast("error", `Error ${error}`);
        }
    };

    return (
        <>
            <div className="flex flex-col-2 w-full h-screen">
                <div
                    className="w-full bg-cover bg-center hidden md:block"
                    style={{ backgroundImage: `url(${eventsImage})` }}
                ></div>

                <div className="w-full flex flex-col justify-center p-8 gap-y-4">
                    <h1 className="text-3xl font-extrabold text-gray-600">
                        Login your account
                    </h1>
                    <p className="text-gray-600">Email</p>
                    <Input
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                    />

                    <p className="text-gray-600">Password</p>
                    <Input
                        placeholder="Enter your password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                    />

                    <Button
                        className="cursor-pointer bg-gray-800"
                        onClick={handleSubmit}
                    >
                        {loading ? "Loading..." : "Login"}
                    </Button>

                    <p>
                        <Link to={"/register"}>
                            Already have an account? Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
