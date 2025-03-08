import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LockImage from "../assets/LockImage.jpg";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert(`All fields are required!`);
        }

        console.log("formData", formData);
    };

    return (
        <>
            <div className="flex flex-col-2 w-full h-screen">
                <div
                    className="w-full bg-cover bg-center hidden md:block"
                    style={{ backgroundImage: `url(${LockImage})` }}
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
                        Login
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
