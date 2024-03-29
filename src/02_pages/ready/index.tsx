import React, {useMemo, useState} from 'react';
import {columnsReady, MainTableGrid, useReadyStore} from "../../03_widgetes/MainTable";
import {TContextMenuTypeParams, TRow} from "../../05_entities/DataGrid";
import {TRowReady} from "../../03_widgetes/MainTable/model/types";

const ReadyPage = () => {
    const [activePath, setActivePath] = useState<string>('...')
    const {rows, delRow, sorted} = useReadyStore()

    const handleFullPath = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        setActivePath(rows.find(row => row.id === id)!.path)
    }

    const handleDelTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        delRow(id)
    }

    const contextMenuParams = useMemo<TContextMenuTypeParams>(() => ({
        cordY: 180,
        cordX: 90,
        contextMenuRow: [
            {id: '1', name: 'Выгрузить результат', onClick: handleFullPath},
            {id: '2', name: 'Удалить', onClick: handleDelTask}
        ]
    }), []);

    return (
        <div className="flex-grow px-[40px] pt-[25px] flex flex-col">
            <h1 className="text-3xl mb-[30px]">Выгрузка результатов</h1>
            <MainTableGrid columns={columnsReady}
                           rows={rows}
                           sorted={sorted}
                           contextMenuOptionals={contextMenuParams}/>
        </div>
    );
};

export default ReadyPage;