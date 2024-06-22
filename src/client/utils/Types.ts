import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface IFileBlob {
    blobData: string;
}

export interface INavDirectoryItem {
    name: string;
    icon: IconDefinition
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
