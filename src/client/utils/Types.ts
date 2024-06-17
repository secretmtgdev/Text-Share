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

export interface IError {
    code: number;
    message: string;
}
