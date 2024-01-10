import React from "react";

export type TContextMenuType = {
    id: string | number;
    name?: string;
    dynamicName?: (path: string) => string;
    onClick: (e: React.MouseEvent<HTMLDivElement>, idCell: string) => void;
}

export type TContextMenuTypeParams = {
    cordX: number;
    cordY: number;
    contextMenuTable?: TContextMenuType[];
    contextMenuRow?: TContextMenuType[];
}