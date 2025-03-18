import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const userSideBarItemsList = [
    {
        name: "Home",
        icon: "",
        path: "/",
    },
    {
        name: "Bookings",
        icon: "",
        path: "/bookings",
    },
    {
        name: "Reports",
        icon: "",
        path: "/report",
    },
    {
        name: "Logout",
        icon: "",
        path: "/",
    },
];

const adminSideBarItemsList = [
    {
        name: "Home",
        icon: "",
        path: "/",
    },
    {
        name: "Events",
        icon: "",
        path: "/admin/all-event",
    },
    {
        name: "Bookings",
        icon: "",
        path: "/admin/bookings",
    },
    {
        name: "Reports",
        icon: "",
        path: "/admin/reports",
    },
    {
        name: "Logout",
        icon: "",
        path: "/",
    },
];

const SideBar = () => {
    const userData = useSelector((state) => state?.auth);
    // console.log("userData", userData);

    const adminUser = userData?.data?.data?.isAdmin;
    // console.log("adminUser", adminUser);

    const retailUser = userData?.data?.data?.isAdmin === false;

    return (
        <>
            <div className="bg-red-200 w-full h-screen">
                {adminUser &&
                    adminSideBarItemsList &&
                    adminSideBarItemsList.length > 0 &&
                    adminSideBarItemsList.map((item, index) => (
                        <div key={index}>
                            <Link to={item.path}>{item.name}</Link>
                        </div>
                    ))}

                {retailUser &&
                    userSideBarItemsList &&
                    userSideBarItemsList.length > 0 &&
                    userSideBarItemsList.map((item, index) => (
                        <div key={index}>{item.name}</div>
                    ))}
            </div>
        </>
    );
};

export default SideBar;
