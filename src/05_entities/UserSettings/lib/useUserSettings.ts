import {TModel, TUserSettings} from "../model/types";
import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

type State = {
    settings: TUserSettings
}

type Actions = {
    setDefaultModel: (model: TModel) => void
    setWidthRename: (width: string) => void
    setHeightRename: (height: string) => void
}

export const useUserSettings = create<State & Actions>()(
    devtools(
        persist(
            set => ({
                settings: {defaultModel: 0, defaultModelName: 'None', widthRename: '33%', heightRename: '50%'},
                setDefaultModel: ({defaultModelName, defaultModel}) => set(state => ({
                    settings: {...state.settings, defaultModel, defaultModelName}
                })),
                setWidthRename: (width) => set(state => ({
                     settings: {...state.settings, widthRename: width}
                })),
                setHeightRename: (height) => set(state => ({
                    settings: {...state.settings, heightRename: height}
                }))
            }), {name: 'useUserSettings'}
        )
    )
)