import React from "react";
import {SpringRef, SpringValue} from "react-spring";
import {TBounds} from "./dragTypes";

export type countNewBoundsProps = {
    imgBlockRef: React.RefObject<HTMLImageElement>,
    parentRef: React.RefObject<HTMLDivElement>,
    apiDrag: SpringRef<{ x: number, y: number }>
    scale: SpringValue<number>,
    x: SpringValue<number>,
    y: SpringValue<number>,
    setBounds: React.Dispatch<React.SetStateAction<TBounds>>,
}