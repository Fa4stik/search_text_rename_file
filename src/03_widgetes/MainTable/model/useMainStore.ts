import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {TRowMain} from "./types";

type State = {
    rows: TRowMain[];
}

type Actions = {
    addRow: (row: TRowMain) => void;
    delRow: (id: string) => void;
}

export const useMainStore = create<State & Actions>()(
    devtools(
        persist(
            (set) => ({
                rows: [],
                addRow: (row) => set(state => ({
                    rows: [...state.rows, {...row}]
                })),
                delRow: (id) => set(state => ({
                    rows: state.rows.filter(row => row.id !== id)
                }))
            }),
            {name: 'mainStore'}
        )
    )
)