import React from 'react';
import {PageHeader} from "../../04_features/PageHeader";
import {columnsRename, MainTableGrid} from "../../03_widgetes/MainTable";
import {HeaderButtonProps} from "../../06_shared/model/typeProps";
import {handle} from "../../06_shared/ui/icon";
import {TRow} from "../../05_entities/DataGrid/model/gridTypes";

const RenamesPage = () => {
    const onClickOpenTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    }

    const onClickSendTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    }

    const onClickSendTasks = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    }

    const headerParams: HeaderButtonProps[] = [
        {
            icon: handle.open,
            onClick: onClickOpenTask,
            children: 'Открыть'
        },
        {
            icon: handle.send,
            onClick: onClickSendTask,
            children: 'Отправить'
        },
        {
            icon: handle.sendAll,
            onClick: onClickSendTasks,
            children: 'Отправить все'
        },
    ]

    const rows: TRow[] = [
        {
            id: '1',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            timeHandle: '15',
        },
        {
            id: '2',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            timeHandle: '15',
        },
        {
            id: '3',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            timeHandle: '15',
        },
        {
            id: '4',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            timeHandle: '15',
        },
        {
            id: '5',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            timeHandle: '15',
        },
        {
            id: '6',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            timeHandle: '15',
        },
    ]

    return (
        <div className="w-full h-full px-[40px] py-[25px]">
            <h1 className="text-3xl mb-[20px]">Список выполняемых обработок</h1>
            <PageHeader buttonProps={headerParams}/>
            <MainTableGrid columns={columnsRename} rows={rows}/>
        </div>
    );
};

export default RenamesPage;