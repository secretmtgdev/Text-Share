/**
 * Enables custom actions for the user to perform on a file or set of files.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import { faLink, faShare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import './FileOptions.css';

const FileOptions = () => {
    const copyDriveLink = () => {}
    const shareWithUser = () => {}
    const deleteFiles = () => {}
    return (
        <div id='file-options-container'>
            {/* Copy link to drive */}
            <button onClick={copyDriveLink}>
                <FontAwesomeIcon icon={faLink} />
            </button>

            {/* Share with a user */}
            <button onClick={shareWithUser}>
                <FontAwesomeIcon icon={faShare} />
            </button>

            {/* Delete selected files */}
            <button onClick={deleteFiles}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
};

export default FileOptions;
