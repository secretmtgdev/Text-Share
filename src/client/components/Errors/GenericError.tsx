/**
 * Component used to handle server and client errors with a visual display of what went wrong.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import React from "react";
import { useTranslation } from "react-i18next";

import { IImage } from "../../utils/Types";

export type GenericErrorProps = {
    title: string;
    message: string;
    imgRef?: IImage;
}

const GenericError = ({ title, message, imgRef }: GenericErrorProps) => {
    const { t } = useTranslation();
    return (
        <div id="error-container">
            <h2>{t(title)}</h2>
            <p>
                {t(message)}
            </p>
            {imgRef && 
                <img src={imgRef.src} alt={t(imgRef.alt)} />}
        </div>
    );
};

export default GenericError;
