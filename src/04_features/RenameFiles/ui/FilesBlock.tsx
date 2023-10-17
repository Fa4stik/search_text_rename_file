import React from 'react';
import {TColumnReadyFiles} from "../model/gridStyles";
import {BodyGrid, TRow} from "../../../05_entities/DataGrid";

type FilesBlockProps = {
    columns: TColumnReadyFiles
    rows: TRow[]
}

export const FilesBlock:
    React.FC<FilesBlockProps> = ({rows,
                                     columns}) => {

    return (
        <div className="w-1/3 h-full flex flex-col
                    border-solid border-r-[2px] border-r-mainDark">
            <BodyGrid width="100%" columns={columns} rows={rows}/>
        </div>
    );
};