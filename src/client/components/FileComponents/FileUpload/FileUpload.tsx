/**
 * Allows users to upload files to the drive.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import UnableToUploadFile from '../../Errors/UnableToUploadFile';
import { FILES_ENDPOINT } from '../../../utils/Endpoints';
import { TranslationKeys } from './TranlsationKeys';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setFileActionPerformed, setFileErrorState } from '../../../redux/fileSlice';
import { ERROR_TYPES, FILE_ACTIONS, IServerError } from '../../../utils/Types';

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
        } else {
            setCanUpload(false);
        }
    }, [files])

    const handleTextFileUpload = async () => {
        const textFile = document.getElementById('files-to-upload') as HTMLInputElement;
        if (textFile && textFile.files && textFile.files.length > 0) {
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
            const response = await axios.post(FILES_ENDPOINT, 
                data,
                {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                }
            );

            if (response.status === 200) {
                setFiles({} as FileList);
                dispatch(
                    setFileActionPerformed(FILE_ACTIONS.FILE_UPLOAD)
                );
            }
        } catch (error) {
            dispatch(
                setFileErrorState({
                    type: ERROR_TYPES.FILE_LIST,
                    code: 500,
                    message: `Could not upload files, reason being ${(error as IServerError).response.data.error_msg}`
                })
            );
        }
    }

    const openFilePicker = () => {
        document.getElementById('filesToUpload')?.click();
    }

    return (
        <div id='file-upload-container' className='flex-column-container'>
            <form
                onSubmit={handleSubmit}
                id='file-upload'
                method='post'
                encType='multipart/form-data'>
                
                <label className='file-upload-wrapper btn' onClick={openFilePicker} htmlFor='files-to-upload'>
                    <span><FontAwesomeIcon icon={faPlus} /></span>
                    <span>{t(TranslationKeys.fileUpload)}</span>
                    <input
                        onChange={handleTextFileUpload}
                        id='files-to-upload'
                        type='file'
                        name='files-to-upload'
                        accept='.txt'
                        form='file-upload'
                        required/>
                </label>                
                {canUpload && <button>Upload</button>}
                {!!fileState.error.code && fileState.error.type as ERROR_TYPES === ERROR_TYPES.FILE_UPLOAD && <UnableToUploadFile />}   
            </form>
        </div>
    );
};

export default FileUpload;
