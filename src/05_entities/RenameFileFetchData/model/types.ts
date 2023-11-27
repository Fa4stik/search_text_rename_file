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
    angle: number,
    tags: string[],
    text: string[],
    bboxes: TBboxResp[]
}

export type TAddFileName = {
    uid: number,
    filename: string,
    is_duplicate: boolean
}

export type TGetPermaTagsReq = {
    tags: string[]
}

export type TRmPermaTagsReq = {
    response: boolean
}

export type TProcessImgReq = {
    uid: number,
    old_filename: string,
    duplicate_id: number
}

export type TImgSizes = {
    x1: number,
    y1: number,
    width: number,
    height: number
}