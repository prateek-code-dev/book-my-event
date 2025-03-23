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
    path: "/booking",
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
    path: "/admin/booking",
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
      <div className="bg-gray-200 dark:bg-gray-800 dark:text-white w-full h-screen px-4 py-6 text-xl font-semibold gap-4">
        {adminUser &&
          adminSideBarItemsList &&
          adminSideBarItemsList.length > 0 &&
          adminSideBarItemsList.map((item, index) => (
            <div key={index} className="p-2">
              <Link to={item.path}>{item.name}</Link>
            </div>
          ))}

        {retailUser &&
          userSideBarItemsList &&
          userSideBarItemsList.length > 0 &&
          userSideBarItemsList.map((item, index) => (
            <div key={index} className="p-2">
              <Link to={item.path}>{item.name}</Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default SideBar;
