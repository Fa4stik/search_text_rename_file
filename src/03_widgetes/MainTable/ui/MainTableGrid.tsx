import React from 'react';
import {TRow} from "../../../05_entities/DataGrid/model/gridTypes";
import {BodyGrid} from "../../../05_entities/DataGrid/ui/BodyGrid";
import {GridHeader} from "../../../04_features/GridHeader/";
import {TColumnsReady, TColumnsMain, TColumnsRename} from "../model/gridStyles";

type MainTableGridProps = {
    columns: TColumnsMain | TColumnsRename | TColumnsReady
    rows: TRow[]
    rowOnClick?: (e: React.MouseEvent<HTMLTableRowElement>, id: string) => void
}

export const MainTableGrid: React.FC<MainTableGridProps> =
        ({columns,
             rows,
             rowOnClick}) => {
    return (
        <>
            <GridHeader sorted={true} filters={true} nameHandle={true} search={true}/>
            <BodyGrid columns={columns} rows={rows} width={'100%'} rowOnClick={rowOnClick}/>
        </>
    );
};