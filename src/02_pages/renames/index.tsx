import React from 'react';
import {columnsRename, MainTableGrid, useReadyStore, useRenameStore} from "../../03_widgetes/MainTable";
import {useNavigate} from "react-router-dom";
import {TContextMenuTypeParams} from "../../05_entities/DataGrid";
import {archiveChunk} from "../../05_entities/RenameFileFetchData";

const RenamesPage = () => {
    const navigate = useNavigate()
    const {rows, delRow, setNameHandler} = useRenameStore()

    const handleOpenTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        navigate(id)
    }

    const handleOpenDoubleClickTask = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        e.preventDefault()
        navigate(id)
    }

    const handleUploadTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        const nameTask = rows.find(row => row.id === id)!.name
        archiveChunk(id, nameTask)
            .then(resp => {
                window.open(resp)
            })
            .catch(err => console.log(err))
    }

    const handleDelTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        delRow(id)
    }

    const contextMenuParams: TContextMenuTypeParams = {
        cordY: 180,
        cordX: 90,
        contextMenuRow: [
            {id: '1', name: 'Переименовать файлы', onClick: handleOpenTask},
            {id: '2', name: 'Выгрузить результат', onClick: handleUploadTask},
            {id: '3', name: 'Удалить', onClick: handleDelTask}
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