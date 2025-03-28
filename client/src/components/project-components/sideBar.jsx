import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { IoMdBookmarks } from "react-icons/io";
import { IoHomeSharp, IoLogOut } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";
import { ThemeToggle } from "../theme-toggle";

const userSideBarItemsList = [
    {
        name: "Home",
        icon: <IoHomeSharp />,
        path: "/",
    },
    {
        name: "Bookings",
        icon: <IoMdBookmarks />,
        path: "/booking",
    },
    {
        name: "Reports",
        icon: <HiDocumentReport />,
        path: "/report",
    },
    {
        name: "Logout",
        icon: <IoLogOut />,
        path: "/",
    },
];

const adminSideBarItemsList = [
    {
        name: "Home",
        icon: <IoHomeSharp />,
        path: "/",
    },
    {
        name: "Events",
        icon: <MdEventNote />,
        path: "/admin/all-event",
    },
    {
        name: "Reports",
        icon: <HiDocumentReport />,
        path: "/admin/report",
    },
    {
        name: "Users",
        icon: <FaUserFriends />,
        path: "/admin/user",
    },
    {
        name: "Logout",
        icon: <IoLogOut />,
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
            <div className="bg-gray-200 dark:bg-gray-800 dark:text-white w-full h-screen px-4 py-6 text-xl font-semibold gap-4">
                {adminUser &&
                    adminSideBarItemsList &&
                    adminSideBarItemsList.length > 0 &&
                    adminSideBarItemsList.map((item, index) => (
                        <div key={index} className="p-2">
                            <Link
                                to={item.path}
                                className="flex items-center gap-4 hover:cursor-pointer hover:text-slate-600"
                            >
                                {item.icon} {item.name}
                            </Link>
                        </div>
                    ))}

                {retailUser &&
                    userSideBarItemsList &&
                    userSideBarItemsList.length > 0 &&
                    userSideBarItemsList.map((item, index) => (
                        <div key={index} className="p-2">
                            <Link
                                to={item.path}
                                className="flex items-center gap-4 hover:cursor-pointer hover:text-slate-600"
                            >
                                {item.icon} {item.name}
                            </Link>
                        </div>
                    ))}
                <div className="my-8 w-full">
                    <ThemeToggle />
                </div>
            </div>
        </>
    );
};

export default SideBar;
