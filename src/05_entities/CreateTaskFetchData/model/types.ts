import {isNumber} from "lodash";

type TFolderTip = string;
export type TFoldersReq = {
    folders: TFolderTip[]
}

type TFileTip = string;
export type TFilesReq = {
    files: TFileTip[]
}

type TFilePath = string
export type TUploadFilesReq = {
    paths: TFilePath[];
}

type TProcessChunkResult = {
    uid: number,
    old_filename: string,
    duplicate_id: number
}
export type TProcessChunkReq = {
    chunk_id: number,
    results: TProcessChunkResult[]
}

export type TGetOcrModelsReq = {
    models: string[]
}