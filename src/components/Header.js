import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation(); // Get the current location

    return (
        <div className="header">
            {/* Render button only if the current path is not "/" */}
            <div className="Header-container">
                {location.pathname !== "/" ? (
                    <span>
                        <Link to="/">
                            <button className="btn3">{"<"}</button>
                        </Link>
                    </span>
                ) : (
                    <span>
                        {/* Refresh button */}
                        <button className="btn4" onClick={() => window.location.reload()}>
                            Logout
                        </button>
                    </span>
                )}
                <h2>Kongu Contact Manager</h2>
            </div>
        </div>
    );
};

export default Header;
