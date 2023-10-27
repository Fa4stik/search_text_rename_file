import React, {useState} from 'react';
import {columnsRename, MainTableGrid, useReadyStore, useRenameStore} from "../../03_widgetes/MainTable";
import {useNavigate} from "react-router-dom";
import {TContextMenuTypeParams, TRow} from "../../05_entities/DataGrid";
import {addFileNames} from "../../05_entities/RenameFileFetchData/model/addFileNames";

const RenamesPage = () => {
    const navigate = useNavigate()
    const {rows, delRow, setNameHandler} = useRenameStore()
    const {addRow: addRowReady, rows: readyRows} = useReadyStore()

    const [activeRow, setActiveRow] =
        useState<{id: string; name: string}>({} as {id: string; name: string})

    const handleOpenTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        navigate(id)
    }

    const handleSendTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        const readyRow = rows.find(row => row.id === id)!
        const files = readyRow.renameFiles
        addFileNames(files.map(file =>
            ({filename: file.name, is_duplicate: Boolean(file.is_duplicate), uid: file.uid}))
        ).then(resp => {
            console.log(resp)
            addRowReady({...readyRow, path: `path/${id}`, id: (readyRows.length+1).toString()})
            delRow(id)
        })
    }

    const handleSendAllTasks = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        console.log('Отправлены все задачи')
    }

    const contextMenuParams: TContextMenuTypeParams = {
        cordY: 180,
        cordX: 90,
        contextMenuRow: [
            {id: '1', name: 'Открыть', onClick: handleOpenTask},
            {id: '2', name: 'Отправить', onClick: handleSendTask},
            {id: '3', name: 'Отправить все', onClick: handleSendAllTasks},
        ]
    }

    const handleChangeNameTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActiveRow(prevState => ({...prevState, name: e.target.value}))
        setNameHandler(activeRow.id, activeRow.name)
    }

    const rowOnClick = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        e.preventDefault()
        const name = rows.find(row => row.id === id)!.name
        setActiveRow({id, name})
        console.log(name)
    }

    return (
        <div className="flex-grow px-[40px] pt-[25px] flex flex-col">
            <h1 className="text-3xl mb-[30px]">Задачи ожидающие изменения</h1>
            <MainTableGrid columns={columnsRename} rows={rows}
                           contextMenuOptionals={contextMenuParams}
                           handleChangeNameTask={handleChangeNameTask}
                           valueTask={activeRow.name}
                           rowOnClick={rowOnClick}
            />
        </div>
    );
};

export default RenamesPage;