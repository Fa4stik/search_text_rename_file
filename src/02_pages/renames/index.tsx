import React from 'react';
import {columnsRename, MainTableGrid, useRenameStore} from "../../03_widgetes/MainTable";
import {useNavigate} from "react-router-dom";
import {TContextMenuTypeParams, TRow} from "../../05_entities/DataGrid";

const RenamesPage = () => {
    const navigate = useNavigate()
    const {rows, delRow} = useRenameStore()

    const handleOpenTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        navigate(id)
    }

    const handleSendTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        delRow(id)
        console.log('Отправлена задача', id)
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

    return (
        <div className="flex-grow px-[40px] pt-[25px] flex flex-col">
            <h1 className="text-3xl mb-[30px]">Задачи ожидающие изменения</h1>
            <MainTableGrid columns={columnsRename} rows={rows} contextMenuOptionals={contextMenuParams}/>
        </div>
    );
};

export default RenamesPage;