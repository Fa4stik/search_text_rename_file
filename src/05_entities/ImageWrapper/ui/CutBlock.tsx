import React, {useState} from 'react';
import {imageWrapper} from "../../../06_shared/ui/icon";

type CutBlockProps = {}

export const CutBlock: React.FC<CutBlockProps> = ({}) => {
    const [isRecActive, setIsRecActive] =
        useState<boolean>(false)
    const [isSquareActive, setIsSquareActive] =
        useState<boolean>(false)
    const [isEdit, setIsEdit] =
        useState<boolean>(false)

    return (
        <>
            <img src={imageWrapper.rectangle} alt="Cut Rectungle"
                 className={`h-full rounded-md transition-all ease-in-out duration-500
                                 ${isRecActive && 'bg-mainGreen/[0.6]'}`}
                 // onClick={handleCutRectangle}
            />
            <img src={imageWrapper.square} alt="Cut Square"
                 className={`h-full rounded-md transition-all ease-in-out duration-500
                                 ${isSquareActive && 'bg-mainGreen/[0.6]'}`}
                 // onClick={handleCutSquare}
            />
            <img src={imageWrapper.cut} alt="Cut Square"
                 className={`h-full rounded-md transition-all ease-in-out duration-500
                                 ${isEdit && 'bg-mainGreen/[0.6]'}`}
                 // onClick={handleCut}
            />
        </>
    );
};