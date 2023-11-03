import React, {useState} from 'react';
import {columnsRename, MainTableGrid, useReadyStore, useRenameStore} from "../../03_widgetes/MainTable";
import {useNavigate} from "react-router-dom";
import {TContextMenuTypeParams, TRow} from "../../05_entities/DataGrid";
import {addFileNames} from "../../05_entities/RenameFileFetchData/model/addFileNames";

const RenamesPage = () => {
    const navigate = useNavigate()
    const {rows, delRow, setNameHandler} = useRenameStore()
    const {addRow: addRowReady, rows: readyRows} = useReadyStore()

    const handleOpenTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        navigate(id)
    }

    const handleOpenDoubleClickTask = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        e.preventDefault()
        navigate(id)
    }

    const handleSaveTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        const readyRow = rows.find(row => row.id === id)!
        const files = readyRow.renameFiles
        addFileNames(files.map(file =>
            ({filename: file.name, is_duplicate: Boolean(file.is_duplicate), uid: file.uid}))
        ).then(resp => {
            console.log('task save')
        })
    }

    const handleUploadTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        console.log('upload archive')
    }

    const handleDelTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        delRow(id)
    }

    const contextMenuParams: TContextMenuTypeParams = {
        cordY: 180,
        cordX: 90,
        contextMenuRow: [
            {id: '1', name: 'Переименование файлов', onClick: handleOpenTask},
            {id: '2', name: 'Сохранить результаты', onClick: handleSaveTask},
            {id: '3', name: 'Выгрузить результат', onClick: handleUploadTask},
            {id: '4', name: 'Удалить', onClick: handleDelTask}
        ]
    }

    return (
        <div className="flex-grow px-[40px] pt-[25px] flex flex-col">
            <h1 className="text-3xl mb-[30px]">Переименование файлов и сохранение результатов</h1>
            <MainTableGrid columns={columnsRename} rows={rows}
                           setNameHandler={setNameHandler}
                           contextMenuOptionals={contextMenuParams}
                           rowOnDoubleClick={handleOpenDoubleClickTask}
            />
        </div>
    );
};

export default RenamesPage;