export type TBbox = {
    x: number,
    y: number,
    w: number,
    h: number
    word: string
}

export type TGetProcessedReq = {
    path: string,
    old_filename: string,
    new_filename: string,
    tags: string[],
    text: string[],
    bboxes: TBbox[]
}