export type TModel = {
    defaultModel: number
    defaultModelName: string
}

export type TUserSettings = TModel & {
    widthRename: string,
    heightRename: string
}