import {TRowReady} from "./types";
import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

type State = {
    rows: TRowReady[]
}

type Actions = {
    addRow: (row: TRowReady) => void;
    delRow: (id: string) => void;
}

export const useReadyStore = create<State & Actions>()(
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