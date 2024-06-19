/**
 * Lists the files that are available to the current user.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import UnableToLoadFiles from "../Errors/UnableToLoadFiles";
import FileListItem from "./FileListItem";
import { mapStateToProps } from "../../utils/Constants";
import { FILES_ENDPOINT } from "../../utils/Endpoints";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFileErrorState } from "../../redux/fileSlice";
import { ERROR_TYPES } from "../..//utils/Types";

const FileList = () => {
    const dispatch = useAppDispatch();
    const fileState = useAppSelector(state => state.fileState);
    const [fileList, setFileList] = useState(['']);
    useEffect(() => {
        const getFiles = async () => {
            try {
                const response = await axios.get(FILES_ENDPOINT);
                setFileList(response.data.fileNames);
            } catch (error) {
                dispatch(
                    setFileErrorState({
                        type: ERROR_TYPES.FILE_LIST,
                        code: 500,
                        message: `Could not get files due to ${(error as AxiosError).message}`
                    })
                );
            }
        }

        getFiles();
    }, [dispatch, fileState.actionPerformed]);

    return (
        <>
            {fileList.length > 0 && 
                (<div role='list'>
                    {fileList.map(fileName => <FileListItem key={fileName} fileName={fileName} />)}
                </div>)
            }
            {!!fileState.error.code && fileState.error.type === ERROR_TYPES.FILE_LIST && <UnableToLoadFiles />}     
        </>
    );
};

export default connect(mapStateToProps)(FileList);
