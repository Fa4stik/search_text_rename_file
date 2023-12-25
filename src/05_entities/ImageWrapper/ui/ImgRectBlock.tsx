import React from 'react';
import {TImgSizes} from "../../FetchPipeline";

type ImgRectBlockProps = {
    imgRect: TImgSizes
}

export const ImgRectBlock: React.FC<ImgRectBlockProps> = ({imgRect}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink"
             className="absolute z-50 w-full h-full top-0 left-0"
        >
            <line x1={imgRect.x1} y1={imgRect.y1}
                  x2={imgRect.x1 + imgRect.width} y2={imgRect.y1}
                  stroke="black"
                  strokeWidth={2}
                  className="z-50"
                // onMouseDown={() => {
                //     setIsResizeUp(true)
                // }}
            />
            <line x1={imgRect.x1 + imgRect.width} y1={imgRect.y1}
                  x2={imgRect.x1 + imgRect.width} y2={imgRect.y1 + imgRect.height}
                  stroke="black"
                  strokeWidth={2}
                  className="z-50"
                // onMouseDown={() => {
                //     setIsResizeRight(true)
                // }}
            />
            <line x1={imgRect.x1} y1={imgRect.y1 + imgRect.height}
                  x2={imgRect.x1 + imgRect.width} y2={imgRect.y1 + imgRect.height}
                  strokeWidth={2}
                  stroke="black"
                  className="z-50"
                // onMouseDown={() => {
                //     setIsResizeDown(true)
                // }}
            />
            <line x1={imgRect.x1} y1={imgRect.y1}
                  x2={imgRect.x1} y2={imgRect.y1 + imgRect.height}
                  stroke="black"
                  strokeWidth={2}
                  className="z-50"
                // onMouseDown={() => {
                //     setIsResizeLeft(true)
                // }}
            />
        </svg>
    );
};