/**
 * Flexible list element with custom actions tied to the file.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import axios, { AxiosError } from "axios";
import React from "react";
import { connect } from "react-redux";

import { FILE_ENDPOINT } from "../../utils/Endpoints";
import { IFileBlob } from "../../utils/Types";
import { mapStateToProps } from "../../utils/Constants";
import { useAppDispatch } from "../../redux/hooks";
import { setFileErrorState } from "../../redux/fileSlice";
import FileOptions from "../FileOptions/FileOptions";

import './FileListItem.css';

export interface FileListItemProps {
    fileName: string;
}

const FileListItem = ({ fileName }: FileListItemProps) => {
    const decoder = new TextDecoder();
    const dispatch = useAppDispatch();
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
            dispatch(
                setFileErrorState({
                    code: 503,
                    message: `Could not get file data: ${(error as AxiosError).message}`
                })
            );
        }
    }

    return (
        <div role='listitem' className='file-list-item'>
            <div className='file-list-item-name' onClick={()=> getFile(fileName)}>
                {fileName}
            </div>
            <FileOptions fileName={fileName} />
        </div>
    );
};

export default connect(mapStateToProps)(FileListItem);
