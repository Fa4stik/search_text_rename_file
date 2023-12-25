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
            (set) => ({
                notifications: [],
                addNotification: (id, text, isError = false) => {
                    set(state => ({
                        notifications: [...state.notifications, { id, text, isError, isActive: false }]
                    }));

                    setTimeout(() => {
                        set(state => ({
                            notifications: state.notifications.map(notify =>
                                notify.id === id ? {...notify, isActive: true} : notify)
                        }));
                    }, 1);

                    const timeOut = new Promise((resolve) => {
                        setTimeout(() => {
                            set(state => ({
                                notifications: [...state.notifications.map(notify => notify.id === id
                                    ? {...notify, isActive: false}
                                    : notify
                                )]
                            }));
                            resolve(true)
                        }, 7000)
                    });

                    timeOut
                        .then(() => {
                            setTimeout(() => {
                                set((state) => ({
                                    notifications: state.notifications.filter(notify => notify.id !== id)
                                }))
                            }, 7000)
                        })
                },
                delNotification: (id) => set(state => ({
                    notifications: [...state.notifications.filter(notify => notify.id !== id)]
                }))
            }), {name: 'useNotifyStore'}
        )
    )
)