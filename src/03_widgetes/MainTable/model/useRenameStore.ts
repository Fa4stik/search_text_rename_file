import {TRowRename} from "./types";
import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {convertDateFull} from "../../../05_entities/MainPage";

type State = {
    rows: TRowRename[]
}

type Actions = {
    addRow: (row: TRowRename) => void;
    setFileName: (idHandler: string, uid: number, newName: string) => void;
    setNameHandler: (idHandler: string, newName: string) => void
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
                setFileName: (idHandler, uid, newName) => set(state => ({
                    rows: state.rows.map(row =>
                        row.id === idHandler
                            ? {...row,
                                renameFiles: row.renameFiles.map(file =>
                                    file.uid === uid
                                        ? {...file, name: newName, dateEdit: convertDateFull(new Date())}
                                        : file
                                )}
                            : row
                    )
                })),
                setNameHandler: (idHandler, newName) => set(state => ({
                    rows: state.rows.map(row =>
                        row.id === idHandler
                            ? {...row, name: newName}
                            : row
                    )
                })),
                delRow: (id) => set((state) => ({
                    rows: state.rows.filter(row => row.id !== id)
                }))
            }),
            {name: 'useRenameStore'}
        )
    )
)