export type TColumn = {
    field: string,
    nameHeader: string,
    width?: string,
    flex?: number
}

export type TRow = {
    id: string,
    [key: string]: string
}