import React from 'react';
import {TColumnReadyFiles} from "../model/gridStyles";
import {BodyGrid, TRow, TRows} from "../../../05_entities/DataGrid";

type FilesBlockProps = {
    columns: TColumnReadyFiles
    rows: TRow[]
    setRows: React.Dispatch<React.SetStateAction<TRows>>
    rowOnClick: (e: React.MouseEvent<HTMLTableRowElement>, id: string) => void
}

export const FilesBlock: React.FC<FilesBlockProps> = ({
    rows,
    setRows,
    columns,
    rowOnClick
}) => {

    return (
        <BodyGrid width="100%" columns={columns}
                  rows={rows} setRows={setRows}
                  rowOnClick={rowOnClick}/>
    );
};