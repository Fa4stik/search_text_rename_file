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
    name: string;
    dateEdit: string;
    is_duplicate: boolean;
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