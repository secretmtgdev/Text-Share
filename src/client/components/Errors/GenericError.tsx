/**
 * Component used to handle server and client errors with a visual display of what went wrong.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import React from "react";

import { IImage } from "../../utils/Types";

export type GenericErrorProps = {
    title: string;
    message: string;
    imgRef?: IImage;
}

const GenericError = ({ title, message, imgRef }: GenericErrorProps) => {
    return (
        <div id="error-container">
            <h2>{title}</h2>
            <p>
                {message}
            </p>
            {imgRef && 
                <img src={imgRef.src} alt={imgRef.alt} />}
        </div>
    );
};

export default GenericError;
