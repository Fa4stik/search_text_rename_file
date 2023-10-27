export type TBboxResp = {
    x: number,
    y: number,
    w: number,
    h: number
}

export type TBbox = TBboxResp & {
    word: string
}

export type TGetProcessedReq = {
    path: string,
    old_filename: string,
    new_filename: string,
    tags: string[],
    text: string[],
    bboxes: TBboxResp[]
}

export type TAddFileName = {
    uid: number,
    filename: string,
    is_duplicate: boolean
}