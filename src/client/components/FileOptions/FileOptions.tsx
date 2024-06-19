/**
 * Enables custom actions for the user to perform on a file or set of files.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import { faDownload, faFileSignature, faStar, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { connect } from "react-redux";

import IconWrapper from "../IconWrapper/IconWrapper";
import { TranslationKeys } from './TranslationKeys';
import { setFileActionPerformed, setFileErrorState } from "../../redux/fileSlice";
import { FILE_ENDPOINT } from "../../utils/Endpoints";
import { ERROR_TYPES, FILE_ACTIONS } from "../../utils/Types";
import { mapStateToProps } from "../../utils/Constants";
import { useAppDispatch } from "../../redux/hooks";

import './FileOptions.css';

export interface FileOptionsProps {
    fileName: string;
}

const FileOptions = ({ fileName }: FileOptionsProps) => {
    const { t } = useTranslation('files/options');
    const dispatch = useAppDispatch();
    const shareWithUser = () => {};
    const downloadFile = () => {};
    const renameFile = () => {};
    const addToFavorites = () => {};
    const deleteFile = async () => {
        try {            
            // leverage axios for progress tracking
            await axios.delete(FILE_ENDPOINT, 
                {
                    data: {
                        fileName
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            dispatch(
                setFileActionPerformed(FILE_ACTIONS.FILE_DELETE)
            );

        } catch (error) {
            console.error(error);
            dispatch(
                setFileErrorState({
                    type: ERROR_TYPES.FILE_UPLOAD,
                    code: 500,
                    message: 'Could not delete file'
                })
            );
        }
    }
    return (
        <div id='file-options-container'>
            <IconWrapper onClickHandler={shareWithUser} ariaLabel={t(TranslationKeys.shareWithUser)} icon={faUserPlus} />
            <IconWrapper onClickHandler={downloadFile} ariaLabel={t(TranslationKeys.downloadFile)} icon={faDownload} />
            <IconWrapper onClickHandler={renameFile} ariaLabel={t(TranslationKeys.renameFile)} icon={faFileSignature} />
            <IconWrapper onClickHandler={addToFavorites} ariaLabel={t(TranslationKeys.addToFavorites)} icon={faStar} />
            <IconWrapper onClickHandler={deleteFile} ariaLabel={t(TranslationKeys.deleteFile)} icon={faTrash} />
        </div>
    );
};

export default connect(mapStateToProps)(FileOptions);
