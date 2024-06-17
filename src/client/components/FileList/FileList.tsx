import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

import { FILES_ENDPOINT, FILE_ENDPOINT } from "../../utils/Endpoints";

import './FileList.css';
import { IFileBlob } from "@src/client/utils/Types";
import UnableToLoadFiles from "../Errors/UnableToLoadFiles";

const FileList = () => {
    const decoder = new TextDecoder();
    const [fileList, setFileList] = useState(['']);
    const [errorEncountered, setErrorEncountered] = useState(false);
    const [errorCode, setErrorCode] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const getFiles = async () => {
            try {
                const response = await axios.get(FILES_ENDPOINT);
                setFileList(response.data.fileNames);
            } catch (error) {
                setErrorEncountered(true);
                setErrorCode(500);
                setErrorMessage(`Could not get files due to ${(error as AxiosError).message}`);
                console.error(error);
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
            setErrorEncountered(true);
            setErrorCode(500);
            setErrorMessage(`Could not get file data: ${(error as AxiosError).message}`);
        }
    }

    return (
        <>
            {fileList.length > 0 && 
                (<ul>
                    {fileList.map(fileName => <li onClick={()=> getFile(fileName)}>{fileName}</li>)}
                </ul>)
            }
            {errorEncountered && <UnableToLoadFiles code={errorCode} message={errorMessage} />}     
        </>
    )
}

export default FileList;