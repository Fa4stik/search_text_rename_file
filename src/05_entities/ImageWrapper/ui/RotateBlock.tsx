import React from 'react';
import {imageWrapper} from "../../../06_shared/ui/icon";
import {SpringRef} from "react-spring";

type RotateBlockProps = {
    setCurrRotate: React.Dispatch<React.SetStateAction<number>>
}

export const RotateBlock: React.FC<RotateBlockProps> =
    ({
         setCurrRotate
     }) => {
    const handleRotateLeft = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrRotate(prevState => prevState-90 < 0
            ? 270
            : prevState - 90
        )
    };

    const handleRotateRight = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrRotate(prevState => prevState+90 === 360
            ? 0
            : prevState + 90
        )
    };

    return (
        <>
            <img src={imageWrapper.left} alt="Left"
                 className="h-full"
                onClick={handleRotateLeft}
            />
            <img src={imageWrapper.right} alt="Left"
                 className="h-full"
                onClick={handleRotateRight}
            />
        </>
    );
};