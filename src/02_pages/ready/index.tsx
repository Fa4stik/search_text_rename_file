import React, {useState} from 'react';
import {columnsReady, MainTableGrid} from "../../03_widgetes/MainTable";
import {TContextMenuTypeParams, TRow} from "../../05_entities/DataGrid";

const rows: TRow[] = [
    {
        id: '1',
        name: 'Обработка №',
        countFiles: '22',
        sizeFiles: '131',
        timeHandle: '15',
        path: `C:\\Program Files\\Docker\\Docker1`
    },
    {
        id: '2',
        name: 'Обработка №',
        countFiles: '22',
        sizeFiles: '131',
        timeHandle: '15',
        path: `C:\\Program Files\\Docker\\Docker2`
    },
    {
        id: '3',
        name: 'Обработка №',
        countFiles: '22',
        sizeFiles: '131',
        timeHandle: '15',
        path: `C:\\Program Files\\Docker\\Docker3`
    },
    {
        id: '4',
        name: 'Обработка №',
        countFiles: '22',
        sizeFiles: '131',
        timeHandle: '15',
        path: `C:\\Program Files\\Docker\\Docker4`
    },
    {
        id: '5',
        name: 'Обработка №',
        countFiles: '22',
        sizeFiles: '131',
        timeHandle: '15',
        path: `C:\\Program Files\\Docker\\Docker5`
    },
    {
        id: '6',
        name: 'Обработка №',
        countFiles: '22',
        sizeFiles: '131',
        timeHandle: '15',
        path: `C:\\Program Files\\Docker\\Docker6`
    },
]

const ReadyPage = () => {
    const [activePath, setActivePath] = useState<string>('...')

    const handleFullPath = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        setActivePath(rows.find(row => row.id === id)!.path)
    }

    const contextMenuParams: TContextMenuTypeParams = {
        cordY: 180,
        cordX: 90,
        contextMenuRow: [
            {id: '1', dynamicName: (path) => `Расположение: ${path}`, onClick: handleFullPath}
        ]
    }

    return (
        <div className="flex-grow px-[40px] pt-[25px] flex flex-col">
            <h1 className="text-3xl mb-[30px]">Завершённый задачи</h1>
            <MainTableGrid columns={columnsReady} rows={rows} contextMenuOptionals={contextMenuParams}/>
        </div>
    );
};

export default ReadyPage;