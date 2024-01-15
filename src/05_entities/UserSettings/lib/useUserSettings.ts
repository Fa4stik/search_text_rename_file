import {TUserSettings} from "../model/types";
import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

type State = {
    settings: TUserSettings
}

type Actions = {
    setDefaultModel: (model: number) => void
}

export const useUserSettings = create<State & Actions>()(
    devtools(
        persist(
            set => ({
                settings: {defaultModel: 0},
                setDefaultModel: (model) => set(state => ({
                    settings: {...state.settings, defaultModel: model}
                }))
            }), {name: 'useUserSettings'}
        )
    )
)