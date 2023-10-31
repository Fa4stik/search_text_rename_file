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

type TProcessImageResult = {
    duplicate_id: number,
    old_filename: string,
    uid: number;
}
export type TProcessImageReq = {
    chunk_id: number;
    results: TProcessImageResult[]
}

export type TGetOcrModelsReq = {
    models: string[]
}