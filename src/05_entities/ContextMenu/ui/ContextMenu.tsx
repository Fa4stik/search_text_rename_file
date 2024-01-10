import React from 'react';
import {TContextMenu} from "../model/types";
import {TContextMenuType, TContextMenuTypeParams, TRow} from "../../DataGrid";
import {TRowMain, TRowReady, TRowRename} from "../../../03_widgetes/MainTable/model/types";

type ContextMenuProps = {
    contextMenu: TContextMenu;
    contextMenuOptionals?: TContextMenuType[];
    cordY: number;
    cordX: number;
    handleCloseContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
    rows: TRowReady[]
    activeRow: string;
}

export const ContextMenu:
    React.FC<ContextMenuProps> = ({contextMenu,
                                      contextMenuOptionals,
                                  handleCloseContextMenu,
                                  rows,
                                  activeRow,
                                  cordX,
                                  cordY}) => {

    if (!contextMenuOptionals)
        return null;

    return (
        <div className="absolute bg-mainWhite/[0.7] border-[1px] backdrop-blur-md
                border-mainDark border-solid w-auto h-auto rounded-md cursor-pointer"
             style={{ top: contextMenu.y-cordY,
                 left: contextMenu.x-cordX }}
             onClick={handleCloseContextMenu}
        >
            {contextMenuOptionals!.map(option => (
                <div className="px-[10px] py-[5px] border-b-[1px] border-solid
                        border-b-mainDark last:border-b-transparent hover:bg-mainDark/[0.1]"
                     key={option.id}
                     onClick={(e) => option.onClick(e, activeRow)}
                >
                    {option.dynamicName
                        ? option.dynamicName(rows[Number.parseInt(activeRow)-1].path)
                        : option.name
                    }
                </div>
            ))}
        </div>
    );
};