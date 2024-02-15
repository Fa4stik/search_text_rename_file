import React from 'react';
import {TColumn, TRow, TRows} from "../model/gridTypes";
import {TRowMain, TRowReady, TRowRename} from "../../../03_widgetes/MainTable";

type TableRowProps = {
    row: TRow | TRowMain | TRowRename | TRowReady
    activeRow: string
    columns: TColumn[]
    setRows?: React.Dispatch<React.SetStateAction<TRows>>
    rowOnDoubleClick?: (e: React.MouseEvent<HTMLTableRowElement>, id: string) => void
    handleChangeColor: (e: React.MouseEvent<HTMLTableRowElement>, id: string, pdf_id?: string) => void
    handleContextMenu: (e: React.MouseEvent<HTMLTableRowElement>, id: string) => void
}

export const TableRow: React.FC<TableRowProps> = ({
    row,
    activeRow,
    columns,
    setRows,
    rowOnDoubleClick,
    handleChangeColor,
    handleContextMenu,
}) => {
    
    return (
        <>
            <tr key={row.id} className={`hover:bg-mainGreen/[0.5] focus:bg-mainGreen transition-all ease-out relative
            ${'isActive' in row && row.isActive && row.heirs && 'border-b-[1.5px] border-solid border-b-mainGreen/[0.6]'}
            ${row.id === activeRow && 'bg-mainGreen'}`}
                onDoubleClick={(e) => {
                    rowOnDoubleClick &&
                    rowOnDoubleClick(e, row.id)
                }}
                onClickCapture={(e) => {
                    if ('isActive' in row && setRows && row.heirs) {
                        setRows(prevState => {
                            const rows = prevState as TRow[]
                            return rows.map(lRow => lRow.id === row.id
                                ? {...lRow, isActive: !lRow.isActive}
                                : lRow
                            )
                        })
                        return;
                    }

                    handleChangeColor(e, row.id)
                }}
                onContextMenu={(e) =>
                    handleContextMenu(e, row.id)}
            >
                {columns.map(column => (
                    column.width !== '0' && (
                        <td key={row.id + column.field}
                            className={`pt-[5px] ${row[column.field as keyof typeof row] === 'В процессе'
                            && 'animate-pulse'}
                                            ${row[column.field as keyof typeof row] === 'Ошибка обработки'
                            && 'text-red-500'} `}
                        >
                            {row[column.field as keyof typeof row]}
                        </td>
                    )
                ))}
            </tr>
            {'isActive' in row && row.isActive && row.heirs && (
                row.heirs.map(heir => (
                    <tr key={heir.uid} className={`hover:bg-mainGreen/[0.5] focus:bg-mainGreen transition-all ease-out relative bg-mainTags/[0.2]
                        ${row.id === activeRow && 'bg-mainGreen'}`}
                        onClick={(e) => {
                            handleChangeColor(e, heir.uid!.toString(), row.id.toString())
                        }}
                    >
                        {columns.map(column => (
                            column.width !== '0' && (
                                <td key={heir.uid + column.field}
                                    className={`pt-[5px] ${heir[column.field as keyof typeof heir] === 'В процессе'
                                    && 'animate-pulse'}
                                            ${heir[column.field as keyof typeof heir] === 'Ошибка обработки'
                                    && 'text-red-500'} `}
                                >
                                    {heir[column.field as keyof typeof heir]?.toString()}
                                </td>
                            )
                        ))}
                    </tr>
                ))
            )}
            {'loading' in row &&
                <tr className="relative">
                    <div
                        className="h-[3px] w-1/2 bg-mainGreen absolute transition-all ease-in-out duration-1000"
                        style={{
                            width: `${row.loading}%`
                        }}
                    />
                </tr>
            }
        </>
    );
};