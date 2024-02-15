import {TRowMain, TRowReady, TRowRename} from "../../../03_widgetes/MainTable";
import {TContentChunkHeir} from "../../FetchPipeline";

export type TColumn = {
    field: string,
    nameHeader: string,
    width?: string,
    flex?: number
}

export type TRow = {
    id: string,
    uid?: string
    name?: string
    isActive?: boolean,
    heirs?: TRow[] | null
}

export type TRows = TRowMain[] | TRowRename[] | TRowReady[] | TRow[]