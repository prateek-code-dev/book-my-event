import React from "react";

const sideMenuItems = [
    {
        icon: "",
        name: "Home",
        path: "/home",
        isActive: false,
        adminAccessOnly: false,
    },
    {
        icon: "",
        name: "Events",
        path: "/admin/events",
        isActive: false,
        adminAccessOnly: true,
    },
    {
        icon: "",
        name: "Bookings",
        path: "/bookings",
        isActive: false,
        adminAccessOnly: false,
    },
    {
        icon: "",
        name: "Bookings",
        path: "/admin/users",
        isActive: false,
        adminAccessOnly: true,
    },
    {
        icon: "",
        name: "Bookings",
        path: "/admin/reports",
        isActive: false,
        adminAccessOnly: true,
    },
    {
        icon: "",
        name: "Logout",
        path: "/logout",
        isActive: false,
        adminAccessOnly: true,
    },
];

const sideBar = () => {
    return <div>sideBar</div>;
};

export default sideBar;
