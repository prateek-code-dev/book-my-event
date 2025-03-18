import SideBar from "@/components/project-components/sideBar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="w-64 bg-gray-900 h-full">
                <SideBar />
            </div>

            {/* Main content area */}
            <div className="flex-1 p-6 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
