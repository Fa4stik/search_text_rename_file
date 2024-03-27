import React, {useEffect, useRef, useState} from 'react';
import {TColumn, TRows} from "../model/gridTypes";
import {TContextMenuTypeParams} from "../model/contextMenuType";
import {ContextMenu} from "../../ContextMenu";
import {TRowReady} from "../../../03_widgetes/MainTable";
import {TableRow} from "./TableRow";
import {useGuideStore} from "../../Guide";

type BodyGridProps = {
    width?: string
    columns: TColumn[]
    rows: TRows
    setRows?: React.Dispatch<React.SetStateAction<TRows>>
    rowOnClick?: (e: React.MouseEvent<HTMLTableRowElement>, id: string, pdf_id?: string) => void
    classStyles?: string;
    contextMenuOptionals?: TContextMenuTypeParams
    rowOnDoubleClick?: (e: React.MouseEvent<HTMLTableRowElement>, id: string) => void
    textEmptyTable?: string
}

export const BodyGrid: React.FC<BodyGridProps> = ({
    rows,
    setRows,
    columns,
    width,
    rowOnClick,
    classStyles,
    contextMenuOptionals,
    rowOnDoubleClick,
    textEmptyTable
}) => {

    const [activeRow, setActiveRow] = useState<string>('')
    const [contextMenu, setContextMenu] =
        useState<{visible: boolean, x: number, y: number}>({ visible: false, x: 0, y: 0 });
    const [isRowContextMenu, setIsRowContextMenu] = useState<boolean>(true)

    const tableScrollRef = useRef<HTMLDivElement>(null)

    const {isSomeActive} = useGuideStore()

    const handleChangeColor = (e: React.MouseEvent<HTMLTableRowElement>, id: string, pdf_id?: string) => {
        e.preventDefault()
        e.stopPropagation();
        setActiveRow(id)
        setContextMenu(prevState => ({...prevState, visible: false}))
        rowOnClick &&
            rowOnClick(e, id, pdf_id)
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

    useEffect(() => {
        if (!isSomeActive) {
            setContextMenu(prevState => ({
                ...prevState,
                visible: false
            }))
            return
        }

        setContextMenu({
            visible: true,
            x: 500,
            y: 500
        })
    }, [isSomeActive]);

    return (
        <div className={`flex-grow bg-mainGray overflow-y-scroll relative select-none ${classStyles}`}
             ref={tableScrollRef}
             onContextMenu={handleContextMenuTable}
             onClick={handleCloseContextMenu}
        >
            <table className={`bg-transparent border-spacing-0 border-collapse`}
                   style={{
                width,
            }}>
                <thead className="sticky top-0 z-10">
                <tr className="bg-mainGray/[0.3] backdrop-blur-md">
                    {columns.map(column => (
                        column.width !== '0' && (
                            <th key={column.field} className={`py-[5px] border-b-[3px] border-solid border-mainDark`}
                                style={{width: column.width}}
                            >
                                {column.nameHeader}
                            </th>
                        )
                    ))}
                </tr>
                </thead>
                <tbody className="text-center">
                {rows.map(row => (
                    <TableRow key={row.id} row={row} setRows={setRows}
                              activeRow={activeRow}
                              handleContextMenu={handleContextMenu}
                              handleChangeColor={handleChangeColor}
                              rowOnDoubleClick={rowOnDoubleClick}
                              columns={columns}
                    />
                ))}
                </tbody>
            </table>
            {rows.length === 0 &&
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {textEmptyTable ?? 'Список пуст'}
                </div>}
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