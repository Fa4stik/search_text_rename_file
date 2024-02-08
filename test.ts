export enum EImages {
    PDF = 'pdf',
    PNG = 'png'
}

type TResult = {
    uid: number,
    old_filename: string,
    duplicate_id: number
    type: EImages
}

type results = [
    TResult & {
        sheets?: TResult[]
    }
]

const myPdf: results  = [
    {
        uid: 1,
        duplicate_id: -1,
        type: EImages.PDF,
        old_filename: 'myPdf.pdf',
        sheets: [
            {
                uid: 12,
                duplicate_id: -1,
                old_filename: '22.jpg',
                type: EImages.PNG
            }
        ],
    },
    // {
    //     uid: 2,
    //     duplicate_id: -1,
    //     type: EImages.PNG,
    //     old_filename: 'myPdf.pdf',
    // }
]