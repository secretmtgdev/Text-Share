/**
 * Component to render a nav directory list item.
 * 
 * @verison 1.0.0
 * @author Michael Wilson
 */
import React from "react";

import { INavDirectoryItem } from "@src/client/utils/Types";

import './NavDirectoryItem.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavDirectoryItem = ({ name, icon }: INavDirectoryItem) => {
    return (
        <li>
            <span><FontAwesomeIcon icon={icon} /></span>
            <span>{name}</span>
        </li>
    );
};

export default NavDirectoryItem;