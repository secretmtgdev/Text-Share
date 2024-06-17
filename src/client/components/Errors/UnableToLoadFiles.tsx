/**
 * Inform the user that content was not able to be loaded from the server.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import React from "react";

import { IError } from "../../utils/Types";
import GenericError from "./GenericError";

const UnableToLoadFiles = ({ code, message }: IError) => {
    return (
        <GenericError title={'Unable to load files'} message={`${code}: ${message}`} />
    );
};

export default UnableToLoadFiles;
