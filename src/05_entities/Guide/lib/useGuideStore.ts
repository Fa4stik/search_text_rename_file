import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {TActivePage} from "../model/types";

type State = {
    statePages: TActivePage
    isSomeActive: boolean
}

type Actions = {
    setActivePage: (page: keyof TActivePage, newState: boolean) => void
}

export const useGuideStore = create<State & Actions>()(
    devtools(
        persist(
            (set) => ({
                isSomeActive: false,
                statePages: {
                    isMain: false,
                    isMainCreate: false,
                    isRenames: false,
                    isRenamesCurr: false
                },
                setActivePage: (page, newState) => set(state => ({
                    isSomeActive: newState,
                    statePages: Object.fromEntries(Object
                        .keys(state.statePages)
                        .map(statePage => statePage === page
                            ? [page, newState]
                            : [statePage, false]
                        )
                    ) as TActivePage
                }))
            }), {name: 'useGuideStore'}
        )
    )
)