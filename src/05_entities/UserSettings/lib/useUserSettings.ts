import {TModel, TUserSettings} from "../model/types";
import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

type State = {
    settings: TUserSettings
}

type Actions = {
    setDefaultModel: (model: TModel) => void
}

export const useUserSettings = create<State & Actions>()(
    devtools(
        persist(
            set => ({
                settings: {defaultModel: 0, defaultModelName: 'None'},
                setDefaultModel: ({defaultModelName, defaultModel}) => set(state => ({
                    settings: {...state.settings, defaultModel, defaultModelName}
                }))
            }), {name: 'useUserSettings'}
        )
    )
)