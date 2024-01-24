import React, {useState} from 'react';
import {GridHeader} from "../../../04_features/GridHeader/";
import {TColumnsReady, TColumnsMain, TColumnsRename} from "../model/gridStyles";
import {BodyGrid, TContextMenuTypeParams, TRow} from "../../../05_entities/DataGrid";
import {TRowMain, TRowReady, TRowRename} from "../model/types";

type TGridRow = TRowMain | TRowRename | TRowReady

type MainTableGridProps = {
    columns: TColumnsMain | TColumnsRename | TColumnsReady
    rows: TRowMain[] | TRowRename[] | TRowReady[]
    setNameHandler?: (idHandler: string, newName: string) => void
    rowOnClick?: (e: React.MouseEvent<HTMLTableRowElement>, id: string) => void
    contextMenuOptionals?: TContextMenuTypeParams;
    rowOnDoubleClick?: (e: React.MouseEvent<HTMLTableRowElement>, id: string) => void
    textEmptyTable?: string
    sorted?: (compareFn: (a: TGridRow, b: TGridRow) => number) => void
}

export const MainTableGrid: React.FC<MainTableGridProps> = ({
    columns,
    rows,
    rowOnClick,
    contextMenuOptionals,
    setNameHandler,
    rowOnDoubleClick,
    textEmptyTable,
    sorted
}) => {

    const [activeRowId, setActiveRowId] =
        useState<string>('')

    const myRowOnClick = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        if (rowOnClick)
            rowOnClick(e, id)
        setActiveRowId(id)
    }

    return (
        <>
            {/*nameHandle*/}
            {/*search*/}
            <GridHeader sorted
                        rows={rows}
                        sortedFn={sorted}
                        activeRowId={activeRowId}
            />
            <BodyGrid columns={columns}
                      rows={rows} width={'100%'} rowOnClick={myRowOnClick}
                      contextMenuOptionals={contextMenuOptionals}
                      rowOnDoubleClick={rowOnDoubleClick}
                      textEmptyTable={textEmptyTable}
            />
        </>
    );
};