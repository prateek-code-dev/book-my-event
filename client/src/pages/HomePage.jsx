import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <Link to={"/admin/create-event"}>Create Event</Link>
            <Link to={"/admin/all-event"}>Display All Event</Link>
        </div>
    );
};

export default HomePage;
