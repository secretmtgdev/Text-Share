/**
 * Enables custom actions for the user to perform on a file or set of files.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import { faDownload, faFileSignature, faStar, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useTranslation } from "react-i18next";

import './FileOptions.css';
import IconWrapper from "../IconWrapper/IconWrapper";
import { TranslationKeys } from './TranslationKeys';

const FileOptions = () => {
    const { t } = useTranslation('files/options');
    const shareWithUser = () => {};
    const downloadFile = () => {};
    const renameFile = () => {};
    const addToFavorites = () => {};
    return (
        <div id='file-options-container'>
            <IconWrapper onClickHandler={shareWithUser} ariaLabel={t(TranslationKeys.shareWithUser)} icon={faUserPlus} />
            <IconWrapper onClickHandler={downloadFile} ariaLabel={t(TranslationKeys.downloadFile)} icon={faDownload} />
            <IconWrapper onClickHandler={renameFile} ariaLabel={t(TranslationKeys.renameFile)} icon={faFileSignature} />
            <IconWrapper onClickHandler={addToFavorites} ariaLabel={t(TranslationKeys.addToFavorites)} icon={faStar} />
        </div>
    );
};

export default FileOptions;
