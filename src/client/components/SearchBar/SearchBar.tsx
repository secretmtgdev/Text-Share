/**
 * Searches for shared or owned content within the drive.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import './SearchBar.css';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const updateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.currentTarget.value);
    }

    const searchDirectory = () => {
        // Search the directory by the search query
    }

    return (
        <div id='navbar-search'>
            <input type="text" placeholder="Search.." onChange={(e) => updateSearchQuery(e)}/>
            <button type="button" onClick={searchDirectory}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
}

export default SearchBar;
