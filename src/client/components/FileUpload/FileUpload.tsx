/**
 * Allows users to upload files to the drive.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";

import { FILE_ENDPOINT } from "../../utils/Endpoints";


import './FileUpload.css';

const FileUpload = () => {
    const [files, setFiles] = useState<FileList>();
    const [canUpload, setCanUpload] = useState(false);

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
            console.error('NO FILES TO UPLOAD');
            return;
        }

        const data = new FormData();
        data.append('file', files[0]);
        try {            
            // leverage axios for progress tracking
            const response = await axios.post(FILE_ENDPOINT, 
                data,
                {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                });
            setFiles([] as unknown as FileList);
        } catch (error) {
            console.error('Could not uploaded files: ', error);
        }

    }

    return (
        <div id='file-upload-container'>
            <form
                onSubmit={handleSubmit}
                id='file-upload'
                method='post'
                encType='multipart/form-data'>
                <label htmlFor='file'>Select text file</label>
                <input
                    onChange={handleTextFileUpload}
                    id='filesToUpload'
                    type='file'
                    name='filesToUpload'
                    accept='.txt'
                    form="file-upload"
                    required/>
                {canUpload && <button>Upload</button>}
            </form>
        </div>
    );
};

export default FileUpload;
