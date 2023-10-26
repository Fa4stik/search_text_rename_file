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

export type TProcessImageReq = {
    chunk_id: number;
    paths: TFilePath[]
}

