import React from "react";
import background from "../assets/background.jpg";
import "./Layout.css";

const Layout = ({ children }) => {
    return (
        <div style={{backgroundImage: `url(${background})`}}
            className="app-container">
                {children}
        </div>
    );
};

export default Layout;