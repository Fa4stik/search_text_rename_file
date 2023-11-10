import React, {TableHTMLAttributes} from 'react';
import {TColumnReadyFiles} from "../model/gridStyles";
import {BodyGrid, TRow} from "../../../05_entities/DataGrid";

type FilesBlockProps = {
    columns: TColumnReadyFiles
    rows: TRow[]
    rowOnClick: (e: React.MouseEvent<HTMLTableRowElement>, id: string) => void
}

export const FilesBlock:
    React.FC<FilesBlockProps> = ({rows,
                                     columns,
                                     rowOnClick}) => {

    return (
        <BodyGrid width="100%" columns={columns} rows={rows} rowOnClick={rowOnClick}/>
    );
};