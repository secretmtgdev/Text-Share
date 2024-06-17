/**
 * Creates a unique nav bar at the top of the SPA application.
 * 
 * @verison 1.0.0
 * @author Michael Wilson
 */

import React, { useState } from "react";
import { connect } from "react-redux";

import { mapStateToProps } from "../../utils/Constants";

import './NavBar.css';
import SearchBar from "../SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    const [showTips, setShowTips] = useState(false);
    return (
        <div id='navbar-container'>
            {/* Logo */}
            <div>
                LOGO PLACEHOLDER
            </div>
            
            {/* Search bar */}
            <SearchBar />

            {/* Questions icon */}
            <div>
                <button type="button" onClick={() => setShowTips(!showTips)}>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                </button>
            </div>

        </div>
    );
}

export default connect(mapStateToProps)(NavBar);