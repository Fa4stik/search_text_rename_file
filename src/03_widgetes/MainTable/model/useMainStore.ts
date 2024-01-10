import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {TRowMain} from "./types";

type State = {
    rows: TRowMain[];
}

type Actions = {
    addRow: (row: TRowMain) => void;
    setNameHandler: (idHandler: string, newName: string) => void
    setStatus: (idHandler: string, newStatus: string, newTextColor?: string) => void
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
                setNameHandler: (idHandler, newName) => set(state => ({
                    rows: state.rows.map(row =>
                        row.id === idHandler
                            ? {...row, name: newName}
                            : row
                    )
                })),
                delRow: (id) => set(state => ({
                    rows: state.rows.filter(row => row.id !== id)
                })),
                setStatus: (id, newStatus, newTextColor) => set(state => ({
                    rows: state.rows.map(row => {
                        if (row.id === id)
                            return {...row, status: newStatus, textColor: newTextColor}
                        return row
                    })
                }))
            }),
            {name: 'mainStore'}
        )
    )
)