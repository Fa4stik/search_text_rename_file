import React, {useEffect, useState} from 'react';
import {imageWrapper} from "../../../06_shared/ui/icon";
import {TImgSizes} from "../../FetchPipeline";

type CutBlockProps = {
    setImgRect: React.Dispatch<React.SetStateAction<TImgSizes>>,
    setIsEmptyImgRect: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
    isEdit: boolean
}

export const CutBlock: React.FC<CutBlockProps> = ({
    setImgRect,
    setIsEmptyImgRect,
    setIsEdit,
    isEdit
}) => {

    const handleCut = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        setIsEdit(prevState => {
            !prevState && setImgRect({x1: 0, width: 0, y1: 0, height: 0})
            return !prevState
        })
        setIsEmptyImgRect(true)
    };

    // useEffect(() => {
    //     setIsRecActive(false)
    //     setIsSquareActive(false)
    //     setIsActiveRefresh(false)
    // }, [resetTools]);

    return (
        <>
            <img src={imageWrapper.cut} alt="Cut Square"
                 className={`h-full rounded-md transition-all ease-in-out duration-500
                                 ${isEdit && 'bg-mainGreen/[0.6]'}`}
                 onClick={handleCut}
            />
        </>
    );
};