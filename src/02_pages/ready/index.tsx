import React, {useState} from 'react';
import {columnsReady, MainTableGrid, useReadyStore} from "../../03_widgetes/MainTable";
import {TContextMenuTypeParams, TRow} from "../../05_entities/DataGrid";
import {TRowReady} from "../../03_widgetes/MainTable/model/types";

const ReadyPage = () => {
    const [activePath, setActivePath] = useState<string>('...')
    const {rows, delRow} = useReadyStore()

    const handleFullPath = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        setActivePath(rows.find(row => row.id === id)!.path)
    }

    const contextMenuParams: TContextMenuTypeParams = {
        cordY: 180,
        cordX: 90,
        contextMenuRow: [
            {id: '1', name: 'Выгрузить результат', onClick: handleFullPath}
        ]
    }

    return (
        <div className="flex-grow px-[40px] pt-[25px] flex flex-col">
            <h1 className="text-3xl mb-[30px]">Выгрузка результатов</h1>
            <MainTableGrid columns={columnsReady} rows={rows} contextMenuOptionals={contextMenuParams}/>
        </div>
    );
};

export default ReadyPage;