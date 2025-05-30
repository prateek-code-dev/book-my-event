import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LockImage from "../assets/LockImage.jpg";
import eventsImage from "../assets/eventsImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import { registerDispatchFunction } from "@/redux/slices/authSlice";
import { showToast } from "@/helper/showToast";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return alert(`All fields are required!`);
    }

    // console.log("formData", formData);

    try {
      const result = await dispatch(
        registerDispatchFunction(formData),
      ).unwrap();

      if (result.success) {
        navigate("/login");

        showToast("success", `Registration done! Kindly Login!`);
      }
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
            Register your account
          </h1>
          <p className="text-gray-600">Name</p>
          <Input
            placeholder="Enter your Name"
            name="name"
            type="text"
            onChange={handleChange}
          />

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

          <Button className="cursor-pointer bg-gray-800" onClick={handleSubmit}>
            {loading ? "Loading..." : "Register"}
          </Button>

          <p>
            <Link to={"/login"}>Already have an account? Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
