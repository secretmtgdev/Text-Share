/**
 * Allows users to upload files to the drive.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import UnableToUploadFile from "../Errors/UnableToUploadFile";
import { FILE_ENDPOINT } from "../../utils/Endpoints";
import { TranslationKeys } from "./TranlsationKeys";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFileErrorState } from "../../redux/fileSlice";
import { ERROR_TYPES } from "../../utils/Types";

import './FileUpload.css';

const FileUpload = () => {
    const [files, setFiles] = useState<FileList>();
    const [canUpload, setCanUpload] = useState(false);
    const { t } = useTranslation('files/upload');
    const dispatch = useAppDispatch();
    const fileState = useAppSelector(state => state.fileState);

    useEffect(() => {
        if (files && files?.length > 0) {
            setCanUpload(true);
        }
    }, [files])

    const handleTextFileUpload = async () => {
        const textFile = document.getElementById('filesToUpload') as HTMLInputElement;
        if (textFile.files && textFile.files.length > 0) {
            setFiles(textFile.files);
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!files) {
            return;
        }

        const data = new FormData();
        data.append('file', files[0]);
        try {            
            // leverage axios for progress tracking
            await axios.post(FILE_ENDPOINT, 
                data,
                {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                }
            );
        } catch (error) {
            dispatch(
                setFileErrorState({
                    type: ERROR_TYPES.FILE_LIST,
                    code: 500,
                    message: 'Could not upload files'
                })
            );
        }
    }

    const openFilePicker = () => {
        document.getElementById('filesToUpload')?.click();
    }

    return (
        <div id='file-upload-container'>
            <form
                onSubmit={handleSubmit}
                id='file-upload'
                method='post'
                encType='multipart/form-data'>
                
                <div className='file-upload-wrapper' onClick={openFilePicker}>
                    <span><FontAwesomeIcon icon={faPlus} /></span>
                    <span><label htmlFor='files-to-upload'>{t(TranslationKeys.fileUpload)}</label></span>
                    <input
                        onChange={handleTextFileUpload}
                        id='files-to-upload'
                        type='file'
                        name='files-to-upload'
                        accept='.txt'
                        form="file-upload"
                        required/>
                </div>                
                {canUpload && <button>Upload</button>}
                {!!fileState.code && fileState.type as ERROR_TYPES === ERROR_TYPES.FILE_UPLOAD && <UnableToUploadFile />}   
            </form>
        </div>
    );
};

export default FileUpload;
