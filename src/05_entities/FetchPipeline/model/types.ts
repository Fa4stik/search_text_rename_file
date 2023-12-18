const fetchUploadFiles = {
    "paths": [
        "string"
    ]
}

export type TUploadFilesResp = typeof fetchUploadFiles

const fetchProcessChunk = {
    "chunk_id": 0,
    "results": [
        {
            "uid": 0,
            "old_filename": "string",
            "duplicate_id": 0
        }
    ]
}

export type TProcessChunkResp = typeof fetchProcessChunk

const fetchProcessImg = {
    "uid": 0,
    "ocr_model_type": "string",
    "pipeline_params": {
        "angle": 0,
        "w2h_koeff": 0,
        "cut": {
            "x1": 0,
            "y1": 0,
            "width": 0,
            "height": 0
        }
    }
}

export type TProcessImgResp = typeof fetchProcessImg

const fetchGetDataById = {
    "chunk_id": 0,
    "angle": 0,
    "old_filename": "string",
    "new_filename": "string",
    "tags": [
        "string"
    ],
    "text": [
        "string"
    ],
    "bboxes": [
        {
            "x": 0,
            "y": 0,
            "w": 0,
            "h": 0
        }
    ]
}

export type TGetDataByIdResp = typeof fetchGetDataById

export type TImgSizes = {
    x1: number,
    y1: number,
    width: number,
    height: number
}

export type TBbox = {
    x: number,
    y: number,
    w: number,
    h: number
    word: string
}