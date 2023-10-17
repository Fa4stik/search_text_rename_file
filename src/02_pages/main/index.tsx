import React, {useEffect, useState} from 'react';
import {columnsMain, MainTableGrid, useMainStore} from "../../03_widgetes/MainTable";
import {useNavigate} from "react-router-dom";
import {TContextMenuTypeParams, TRow} from "../../05_entities/DataGrid";

const MainPage = () => {
    const {rows: mainRows, delRow: delMainRow} = useMainStore()


    const navigate = useNavigate()

    const onRowClick = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        e.preventDefault()
    }

    const onClickAddTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        navigate('/main/create')
    };

    const onClickDelTask = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.preventDefault()
        delMainRow(id)
    };

    const contextMenuParams: TContextMenuTypeParams = {
        cordY: 180,
        cordX: 90,
        contextMenuRow: [
            {id: '1', name: 'Создать', onClick: onClickAddTask},
            {id: '2', name: 'Удалить', onClick: onClickDelTask},
        ],
        contextMenuTable: [
            {id: '1', name: 'Создать', onClick: onClickAddTask},
        ]
    }

    return (
        <div className="w-full h-full px-[40px] pt-[25px] flex flex-col">
            <h1 className="text-3xl mb-[30px]">Список выполняемых обработок</h1>
            {/*<PageHeader buttonProps={headerParams}/>*/}
            <MainTableGrid columns={columnsMain} rows={mainRows}
                           rowOnClick={onRowClick}
                           contextMenuOptionals={contextMenuParams}/>
        </div>
    );
};

export default MainPage;