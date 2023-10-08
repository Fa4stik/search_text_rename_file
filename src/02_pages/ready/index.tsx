import React, {useState} from 'react';
import {PageHeader} from "../../04_features/PageHeader";
import {HeaderButtonProps} from "../../06_shared/model/typeProps";
import {handle} from "../../06_shared/ui/icon";
import {columnsReady, MainTableGrid} from "../../03_widgetes/MainTable";
import {TRow} from "../../05_entities/DataGrid/model/gridTypes";
import {logDOM} from "@testing-library/react";

const ReadyPage = () => {
    const [activePath, setActivePath] = useState<string>('...')

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

    const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        e.preventDefault()
        setActivePath(rows.find(row => row.id === id)!.path)
    }

    return (
        <div className="w-full h-full px-[40px] py-[25px]">
            <h1 className="text-3xl mb-[20px]">Файлы ожидающие изменения</h1>
            <h3 className="text-xl mb-[20px]">Расположение файлов: {activePath}</h3>
            <MainTableGrid columns={columnsReady} rows={rows} rowOnClick={handleRowClick}/>
        </div>
    );
};

export default ReadyPage;