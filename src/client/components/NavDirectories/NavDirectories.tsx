/**
 * Renders a list of common directories that a user may want immediate access to.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import React from "react";

import { navDirectories } from "../../utils/Constants";
import NavDirectoryItem from "./NavDirectoryItem";

const NavDirectories = () => {
    return (
        <ul id='nav-directories-list'>
            {navDirectories.map(directoryItem => <NavDirectoryItem {...directoryItem} />)}
        </ul>
    );
}

export default NavDirectories;
