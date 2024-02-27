const fetchGetGroupTags = [
    {
        "uid": 1,
        "name": "Масштаб",
        "is_local": false
    },
    {
        "uid": 2,
        "name": "Название",
        "is_local": false
    },
    {
        "uid": null,
        "name": "Дата",
        "is_local": true
    }
]

export type TGetGroupTagsResp = typeof fetchGetGroupTags

const getGetTags = {
    "tags": [
        {
            "uid": 1,
            "tag": "gg",
            "group_id": 1
        }
    ]
}

export type TGetTagsResp = typeof getGetTags

export type TTag = {
    uid: number,
    tag: string,
    group_id: number
}

export type TGroupTag = {
    uid: number | null,
    name: string,
    is_local: boolean
    content: TTag[]
}