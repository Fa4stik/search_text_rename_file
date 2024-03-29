import React, {useMemo} from 'react';
import {columnsRename, MainTableGrid, useRenameStore} from "../../03_widgetes/MainTable";
import {useNavigate} from "react-router-dom";
import {TContextMenuTypeParams} from "../../05_entities/DataGrid";
import {archiveChunk} from "../../05_entities/FetchPipeline";

const RenamesPage = () => {
    const navigate = useNavigate()
    const {rows, delRow, setNameHandler, sortedTasks} = useRenameStore()

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
        archiveChunk(id, encodeURI(nameTask))
            .then(pathToFile => {
                window.open([
                    window.location.protocol, '//',
                    process.env.REACT_APP_SERVER_PATH ?? window.location.host,
                    pathToFile
                ].join(''))
            })
            .catch(err => console.log(err))
    }

    const handleDelTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        delRow(id)
    }

    const contextMenuParams = useMemo<TContextMenuTypeParams>(() => ({
        cordY: 180,
        cordX: 90,
        contextMenuRow: [
            {id: '1', name: 'Переименовать файлы', onClick: handleOpenTask},
            {id: '2', name: 'Выгрузить результат', onClick: handleUploadTask},
            {id: '3', name: 'Удалить', onClick: handleDelTask}
        ]
    }), []);

    return (
        <div className="flex-grow px-[40px] pt-[25px] flex flex-col overflow-hidden">
            <h1 className="text-3xl mb-[30px]">Переименование файлов и сохранение результатов</h1>
            <MainTableGrid columns={columnsRename} rows={rows}
                           sorted={sortedTasks}
                           setNameHandler={setNameHandler}
                           contextMenuOptionals={contextMenuParams}
                           rowOnDoubleClick={handleOpenDoubleClickTask}
            />
        </div>
    );
};

export default RenamesPage;