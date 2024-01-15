import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {TNotification} from "../model/types";

type State = {
    notifications: TNotification[]
}

type Actions = {
    addNotification: (id: number, text: string, isError?: boolean) => void
    delNotification: (id: number) => void
}

export const useNotifyStore = create<State & Actions>()(
    devtools(
        persist(
            set => ({
                notifications: [],
                addNotification: (id, text, isError) => set(state => ({
                    notifications: [...state.notifications, {id, text, isError, isActive: true}]
                })),
                delNotification: (id) => set(state => ({
                    notifications: state.notifications.filter(notify => notify.id !== id)
                }))
            }), {name: 'useNotifyStore'}
        )
    )
)