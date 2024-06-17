/**
 * Lists the files that are available to the current user.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

import { FILES_ENDPOINT, FILE_ENDPOINT } from "../../utils/Endpoints";
import { IError, IFileBlob } from "../../utils/Types";
import UnableToLoadFiles from "../Errors/UnableToLoadFiles";

import './FileList.css';


const FileList = () => {
    const decoder = new TextDecoder();
    const [fileList, setFileList] = useState(['']);
    const [error, setError] = useState<IError>();
    useEffect(() => {
        const getFiles = async () => {
            try {
                const response = await axios.get(FILES_ENDPOINT);
                setFileList(response.data.fileNames);
            } catch (error) {
                setError({
                    code: 500,
                    message: `Could not get files due to ${(error as AxiosError).message}`
                });
            }
        }

        getFiles();
    }, []);

    const getFile = async (fileName: string) => {
        try {
            const response = await axios.get(FILE_ENDPOINT, {
                responseType: 'arraybuffer',
                params: {
                    fileName
                }
            });

            const decodedData = decoder.decode(response.data);
            const parsedData = JSON.parse(decodedData);
            const decodedText = (parsedData as IFileBlob).blobData;

            /** Using .innerText forces a reflow whereas textContent does not */
            document.getElementById('passage')!.textContent = decodedText;
        } catch (error) {
            setError({
                code: 503,
                message: `Could not get file data: ${(error as AxiosError).message}`
            });
        }
    }

    return (
        <>
            {fileList.length > 0 && 
                (<ul>
                    {fileList.map(fileName => <li onClick={()=> getFile(fileName)}>{fileName}</li>)}
                </ul>)
            }
            {error && <UnableToLoadFiles code={error.code} message={error.message} />}     
        </>
    );
};

export default FileList;
