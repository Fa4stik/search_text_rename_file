import React, {useEffect, useState} from 'react';
import {TColumn, TRow} from "../model/gridTypes";

type BodyGridProps = {
    width: string
    columns: TColumn[]
    rows: TRow[]
    rowOnClick?: (e: React.MouseEvent<HTMLTableRowElement>, id: string) => void
}

export const BodyGrid: React.FC<BodyGridProps> =
        ({rows,
             columns,
             width,
             rowOnClick}) => {

    const [activeRow, setActiveRow] = useState<string>('')
    const handleChangeColor = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        e.preventDefault()
        setActiveRow(id)
    };

    return (
        <div className="h-full bg-mainGray overflow-y-scroll">
            <table className="bg-transparent border-separate border-spacing-0" style={{
                width,
            }}>
                <thead className="sticky top-0">
                <tr className="bg-mainGray/[0.3] backdrop-blur-md">
                    {columns.map(column => (
                        // border-r-amber-300 border-solid border-2
                        column.width === '0'
                            ?
                                null
                            :
                                <th key={column.field} className={`py-[5px] border-b-[2px] border-solid border-mainDark`}
                                    style={{width: column.width}}
                                >
                                    {column.nameHeader}
                                </th>
                    ))}
                </tr>
                </thead>
                <tbody className="text-center">
                {rows.map(row => (
                    <tr key={row.id} className={`hover:bg-mainGreen/[0.5] focus:bg-mainGreen transition-all ease-out
                        ${row.id === activeRow ? 'bg-mainGreen' : ''}`}
                        onClick={(e) => rowOnClick ? rowOnClick(e, row.id) : null}
                        onClickCapture={(e) => handleChangeColor(e, row.id)}
                    >
                        {columns.map(column => (
                            column.width === '0'
                                ?
                                    null
                                :
                                    <td key={row.id + column.field} className="pt-[5px]">
                                        {row[column.field]}
                                    </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};