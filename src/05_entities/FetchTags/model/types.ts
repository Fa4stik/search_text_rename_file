const fetchGetGroupTags = [
    {
        "uid": 1,
        "name": "Что-то второе"
    },
    {
        "uid": 2,
        "name": "Масштаб"
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
    uid: number,
    name: string,
    content: TTag[]
}