/**
 * Creates a unique nav bar at the top of the SPA application.
 * 
 * @verison 1.0.0
 * @author Michael Wilson
 */

import React from "react";
import { connect } from "react-redux";

import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import { mapStateToProps } from "../../utils/Constants";

import './NavBar.css';

const NavBar = () => {
    return (
        <div id='navbar-container'>
            <SignIn />
            <SignUp />
        </div>
    );
}

export default connect(mapStateToProps)(NavBar);