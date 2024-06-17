import React from "react";

import { navDirectories } from "../../utils/Constants";
import NavDirectoryItem from "./NavDirectoryItem";

const NavDirectories = () => {
    return (
        <ul id='nav-directories-list'>
            {navDirectories.map(directoryItem => <NavDirectoryItem {...directoryItem} />)}
        </ul>
    )
}

export default NavDirectories;