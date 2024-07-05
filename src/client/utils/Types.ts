import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { AxiosHeaders } from "axios";

export interface IFileBlob {
    blobData: string;
}

export interface INavDirectoryItem {
    name: string;
    icon: IconDefinition,
    uuid: string;
}

export interface IImage {
    alt: string;
    src: string;
}

export enum ERROR_TYPES {
    FILE_DELETE,
    FILE_LIST,
    FILE_UPLOAD
}

export interface IError {
    type?: ERROR_TYPES;
    code?: number;
    message?: string;
}

export enum FILE_ACTIONS {
    NONE,
    FILE_DELETE,
    FILE_UPLOAD
}

export interface IFile {
    name: string;
}

export interface IServerResponse {
    error_msg: string;
}

export interface IAxiosResponse {
    data: IServerResponse;
    headers: AxiosHeaders;
    status: number;
    statusText: string;
}

export interface IServerError {
    code: string;
    message: string;
    response: IAxiosResponse;
}

export interface ILogData {
    page: string;
    action: string;
    section?: string;
    component?: string;
    elementName?: string;
}
