import {TContentChunkHeir} from "../../../05_entities/FetchPipeline";
import {TRow} from "../../../05_entities/DataGrid";

type TRowPage = {
    id: string;
    name: string
}

export type TRowMain = TRowPage & {
    countFiles: string;
    sizeFiles: string;
    dataStart: string;
    textColor?: string;
    loading?: number;
    status: string;
}

export type TRenameFile = {
    uid: number;
    name: string;
    dateEdit: string;
    is_duplicate: boolean;
    isActive: boolean
    heirs?: TRow[] | null
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