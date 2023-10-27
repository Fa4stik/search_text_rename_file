import React, {useState} from 'react';
import {GridHeader} from "../../../04_features/GridHeader/";
import {TColumnsReady, TColumnsMain, TColumnsRename} from "../model/gridStyles";
import {BodyGrid, TContextMenuTypeParams, TRow} from "../../../05_entities/DataGrid";
import {TRowMain, TRowReady, TRowRename} from "../model/types";

type MainTableGridProps = {
    columns: TColumnsMain | TColumnsRename | TColumnsReady
    rows: TRowMain[] | TRowRename[] | TRowReady[]
    rowOnClick?: (e: React.MouseEvent<HTMLTableRowElement>, id: string) => void
    contextMenuOptionals?: TContextMenuTypeParams;
    handleChangeNameTask?: (e: React.ChangeEvent<HTMLInputElement>) => void
    valueTask?: string
}

export const MainTableGrid: React.FC<MainTableGridProps> =
        ({columns,
             rows,
             rowOnClick,
             contextMenuOptionals,
             handleChangeNameTask,
         valueTask}) => {
    return (
        <>
            <GridHeader sorted filters nameHandle
                        search
                        valueTask={valueTask}
                        handleChangeNameTask={handleChangeNameTask}/>
            <BodyGrid columns={columns}
                      rows={rows} width={'100%'} rowOnClick={rowOnClick}
                      contextMenuOptionals={contextMenuOptionals}
            />
        </>
    );
};