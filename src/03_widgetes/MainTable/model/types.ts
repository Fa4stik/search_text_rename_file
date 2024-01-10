type TRowPage = {
    id: string;
    name: string
}

export type TRowMain = TRowPage & {
    countFiles: string;
    sizeFiles: string;
    dataStart: string;
    textColor?: string
    status: string;
}

type TRenameFile = {
    uid: number;
    name: string;
    dateEdit: string;
    is_duplicate: boolean;
}

export type TRowRename = TRowPage & {
    countFiles: string;
    sizeFiles: string;
    timeHandle: string;
    renameFiles: TRenameFile[]
}

export type TRowReady = TRowPage & {
    countFiles: string;
    sizeFiles: string;
    timeHandle: string;
    path: string;
}