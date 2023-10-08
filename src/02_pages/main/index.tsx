import React, {useState} from 'react';
import {main} from '../../06_shared/ui/icon'
import {HeaderButtonProps} from "../../06_shared/model/typeProps";
import {PageHeader} from "../../04_features/PageHeader";
import {columnsMain, MainTableGrid} from "../../03_widgetes/MainTable";
import {TRow} from "../../05_entities/DataGrid/model/gridTypes";
import {useNavigate} from "react-router-dom";

const MainPage = () => {
    const [rows, setRows] = useState<TRow[]>([
        {
            id: '1',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '2',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '3',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '4',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '5',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '6',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '7',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '8',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '9',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '10',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '11',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '12',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '13',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '14',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '15',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '16',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '17',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
        {
            id: '18',
            name: 'Обработка №',
            countFiles: '22',
            sizeFiles: '131',
            dataStart: '28.09.2023 20:28',
            status: 'В процессе'
        },
    ])
    const [activeRowId, setActiveRowId] = useState<string>('')

    const navigate = useNavigate()

    const onRowClick = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        e.preventDefault()
        setActiveRowId(id)
    }

    const onClickAddTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate('/main/create')
    };

    const onClickDelTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setRows(prevState => prevState.filter(row => row.id !== activeRowId))
    };

    const headerParams: HeaderButtonProps[] = [
        {
            icon: main.add,
            onClick: onClickAddTask,
            children: 'Создать'
        },
        {
            icon: main.del,
            onClick: onClickDelTask,
            children: 'Удалить'
        },
    ]

    return (
        <div className="w-full h-full px-[40px] pt-[25px] flex flex-col">
            <h1 className="text-3xl">Список выполняемых обработок</h1>
            <PageHeader buttonProps={headerParams}/>
            <MainTableGrid columns={columnsMain} rows={rows} rowOnClick={onRowClick}/>
        </div>
    );
};

export default MainPage;