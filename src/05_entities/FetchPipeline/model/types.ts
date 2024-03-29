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
            "uid": 1,
            "old_filename": "_311191_5.pdf",
            "duplicate_id": -1,
            "file_type": "file",
            "heirs": {
                "uid": 7,
                "old_filename": "page_0.png",
                "duplicate_id": -1
            }
        }
    ]
}

const fetchContentChunkHeir = {
    "uid": 7,
    "old_filename": "page_0.png",
    "duplicate_id": -1
}

export type TContentChunkHeir = typeof fetchContentChunkHeir

const fetchContentChunk = {
    "uid": 1,
    "old_filename": "_311191_5.pdf",
    "duplicate_id": -1,
    "file_type": "file",
}

export type TContentChunk = typeof fetchContentChunk & {
    heirs: TContentChunkHeir[] | null
}

export type TProcessChunkResp = {
    chunk_id: number,
    results: TContentChunk[]
}

const fetchProcessDataMessage = {
    "iter": 0, "length": 1, "message": "\u041e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u043c\u043e\u0434\u0435\u043b\u044c\u044e."
}

export type TProcessDataMessage = typeof fetchProcessDataMessage

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

export type TRespSocket = {
    action: string
}