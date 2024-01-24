import {TRenameFile, TRowRename} from "../model/types";
import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {convertDateFull} from "../../../05_entities/MainPage";
import {TRow} from "../../../05_entities/DataGrid";

type State = {
    rows: TRowRename[]
}

type Actions = {
    addRow: (row: TRowRename) => void;
    setFileName: (idHandler: string, uid: number, newName: string) => void;
    setNameHandler: (idHandler: string, newName: string) => void
    updateUid: (oldUid: number, newUid: number) => void;
    delRow: (id: string) => void;
    sortedTasks: (compareFn: (a: TRowRename, b: TRowRename) => number) => void
    sortedFiles: (id: string, compareFn: (a: TRenameFile, b: TRenameFile) => number) => void
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
                })),
                updateUid: (oldUid, newUid) => set((state) => ({
                    rows: state.rows.map(row =>
                        ({...row, renameFiles: row.renameFiles.map(file =>
                                file.uid === oldUid
                                    ? {...file, uid: newUid}
                                    : file
                            )})
                    )
                })),
                sortedTasks: (compareFn) => set(state => ({
                    rows: [...state.rows.sort(compareFn)]
                })),
                sortedFiles: (id, compareFn) => set(state => ({
                    rows: state.rows.map(row => row.id === id
                        ? {...row, renameFiles: row.renameFiles.sort(compareFn)}
                        : row
                    )
                }))
            }),
            {name: 'useRenameStore'}
        )
    )
)