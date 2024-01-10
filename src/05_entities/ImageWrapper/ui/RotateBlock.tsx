import React from 'react';
import {imageWrapper} from "../../../06_shared/ui/icon";

type RotateBlockProps = {}

export const RotateBlock: React.FC<RotateBlockProps> = ({}) => {
    return (
        <>
            <img src={imageWrapper.left} alt="Left"
                 className="h-full"
                // onClick={handleRotateLeft}
            />
            <img src={imageWrapper.right} alt="Left"
                 className="h-full"
                // onClick={handleRotateLeft}
            />
        </>
    );
};