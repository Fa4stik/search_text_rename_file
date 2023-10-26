export type TRowMain = {
    id: string;
    name: string;
    countFiles: string;
    sizeFiles: string;
    dataStart: string;
    status: string;
}

type TRenameFile = {
    uid: number;
    oldName: string;
    dateEdit: string;
}

export type TRowRename = {
    id: string;
    name: string;
    countFiles: string;
    sizeFiles: string;
    timeHandle: string;
    renameFiles: TRenameFile[]
}

export type TRowReady = {
    id: string;
    name: string;
    countFiles: string;
    sizeFiles: string;
    timeHandle: string;
    path: string;
}