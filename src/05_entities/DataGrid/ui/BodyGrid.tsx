import React, {useRef, useState} from 'react';
import {TColumn, TRow} from "../model/gridTypes";
import {TContextMenuTypeParams} from "../model/contextMenuType";
import {ContextMenu} from "../../ContextMenu";
import {TRowMain, TRowReady, TRowRename} from "../../../03_widgetes/MainTable/model/types";

type BodyGridProps = {
    width?: string
    columns: TColumn[]
    rows: TRowMain[] | TRowRename[] | TRowReady[] | TRow[]
    rowOnClick?: (e: React.MouseEvent<HTMLTableRowElement>, id: string) => void
    classStyles?: string;
    contextMenuOptionals?: TContextMenuTypeParams
    rowOnDoubleClick?: (e: React.MouseEvent<HTMLTableRowElement>, id: string) => void
    textEmptyTable?: string
}

export const BodyGrid: React.FC<BodyGridProps> = ({rows,
         columns,
         width,
         rowOnClick, classStyles,
                                                      contextMenuOptionals,
                                                  rowOnDoubleClick,
                                                  textEmptyTable}) => {

    const [activeRow, setActiveRow] = useState<string>('')
    const [contextMenu, setContextMenu] =
        useState<{visible: boolean, x: number, y: number}>({ visible: false, x: 0, y: 0 });
    const [isRowContextMenu, setIsRowContextMenu] = useState<boolean>(true)

    const tableScrollRef = useRef<HTMLDivElement>(null)

    const handleChangeColor = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        e.preventDefault()
        e.stopPropagation();
        setActiveRow(id)
        setContextMenu(prevState => ({...prevState, visible: false}))
        if (rowOnClick)
            rowOnClick(e, id)
    };

    const handleContextMenu = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        setIsRowContextMenu(true)

        if (contextMenu.visible) {
            setContextMenu(prevState => ({...prevState, visible: false}))
        } else {
            setContextMenu({visible: true, x: e.clientX, y: e.clientY + tableScrollRef.current!.scrollTop})
            setActiveRow(id)
        }
    };

    const handleCloseContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setContextMenu(prevState => ({...prevState, visible: false}))
    };

    const handleContextMenuTable = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        setIsRowContextMenu(false);
        contextMenu.visible
            ? setContextMenu(prevState => ({...prevState, visible: false}))
            : setContextMenu({visible: true, x: e.clientX, y: e.clientY + tableScrollRef.current!.scrollTop})
    };

    return (
        <div className={`flex-grow bg-mainGray overflow-y-scroll relative select-none ${classStyles}`}
             ref={tableScrollRef}
             onContextMenu={handleContextMenuTable}
             onClick={handleCloseContextMenu}
        >
            <table className={`bg-transparent border-separate border-spacing-0`}
                   style={{
                width,
            }}>
                <thead className="sticky top-0 z-10">
                <tr className="bg-mainGray/[0.3] backdrop-blur-md">
                    {columns.map(column => (
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
                        onDoubleClick={(e) => {
                            if (rowOnDoubleClick)
                                rowOnDoubleClick(e, row.id)
                        }}
                        onClickCapture={(e) => handleChangeColor(e, row.id)}
                        onContextMenu={(e) => handleContextMenu(e, row.id)}
                    >
                        {columns.map(column => (
                            column.width === '0'
                                ?
                                    null
                                :
                                    <td key={row.id + column.field}
                                        className={`pt-[5px] ${row[column.field as keyof typeof row] === 'В процессе' 
                                            && 'animate-pulse'}
                                            ${row[column.field as keyof typeof row] === 'Ошибка обработки'
                                            && 'text-red-500'} `}
                                    >
                                        {row[column.field as keyof typeof row]}
                                    </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {rows.length === 0
                ? <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {textEmptyTable ?? 'Список пуст'}
                    </div>
                : null}
            {contextMenu.visible && contextMenuOptionals && (
                <ContextMenu contextMenu={contextMenu}
                             cordY={contextMenuOptionals.cordY}
                             cordX={contextMenuOptionals.cordX}
                             contextMenuOptionals={isRowContextMenu
                                 ? contextMenuOptionals.contextMenuRow
                                 : contextMenuOptionals.contextMenuTable
                            }
                             handleCloseContextMenu={handleCloseContextMenu}
                             rows={rows as TRowReady[]} activeRow={activeRow}
                />
            )}
        </div>
    );
};