import {TRowRename} from "./types";
import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

type State = {
    rows: TRowRename[]
}

type Actions = {
    addRow: (row: TRowRename) => void;
    delRow: (id: string) => void;
}

export const useRenameStore = create<State & Actions>()(
    devtools(
        persist(
            (set) => ({
                rows: [],
                addRow: (row) => set((state) => ({
                    rows: [...state.rows, row]
                })),
                delRow: (id) => set((state) => ({
                    rows: state.rows.filter(row => row.id !== id)
                }))
            }),
            {name: 'useRenameStore'}
        )
    )
)