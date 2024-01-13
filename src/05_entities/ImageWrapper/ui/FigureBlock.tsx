import React, {useEffect, useState} from 'react';
import {imageWrapper} from "../../../06_shared/ui/icon";
import {TImgSizes} from "../../FetchPipeline";
import {SpringRef} from "react-spring";

type FigureBlockProps = {
    setCurrCrop: React.Dispatch<React.SetStateAction<number>>,
    setImgRect: React.Dispatch<React.SetStateAction<TImgSizes>>,
    origImgSizes: TImgSizes,
    setIsRec: (value: React.SetStateAction<boolean>) => void,
    setIsSquare: (value: React.SetStateAction<boolean>) => void,
    parentRef: React.RefObject<HTMLDivElement>,
    imgBlockRef: React.RefObject<HTMLDivElement>,
    apiWheel: SpringRef<{scale: number}>,
    setIsEmptyImgRect: (value: React.SetStateAction<boolean>) => void
    updateBounds: (scale: number) => void
}

export const FigureBlock: React.FC<FigureBlockProps> = ({
    setCurrCrop,
    setImgRect,
    origImgSizes,
    setIsRec,
    setIsSquare,
    imgBlockRef,
    parentRef,
    apiWheel,
    setIsEmptyImgRect,
    updateBounds
}) => {

    const [isRecActive, setIsRecActive] =
        useState<boolean>(false)
    const [isSquareActive, setIsSquareActive] =
        useState<boolean>(false)

    const handleCutRectangle = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        setIsRecActive(prevState => {
            !prevState ? setCurrCrop(0.66) : setCurrCrop(0)
            return !prevState
        })
        setIsSquareActive(false)
        setImgRect(origImgSizes)
    };

    const handleCutSquare = () => {
        setIsRecActive(false)
        setIsSquareActive(prevState => {
            !prevState ? setCurrCrop(1) : setCurrCrop(0)
            return !prevState
        })
        setImgRect(origImgSizes)
    };

    const handleActiveFigure = (isRec: boolean, isSquare: boolean) => {
        setIsRec(isRec)
        setIsSquare(isSquare)
        const sizeMyParent = parentRef.current!.getBoundingClientRect()
        const sizeMyImg = imgBlockRef.current!.getBoundingClientRect()
        const origWidthImg = sizeMyImg.width / apiWheel.current[0].get().scale;
        const origHeightImg = sizeMyImg.height / apiWheel.current[0].get().scale;
        if (isRec) {
            if (origWidthImg > origHeightImg) {
                const width = (3/2)*origHeightImg
                setImgRect({x1: 0, y1: 0, height: origHeightImg, width})
                setIsEmptyImgRect(false)
                apiWheel({scale: sizeMyParent.height/width, onChange: (result) => {
                        updateBounds(result.value.scale)
                    }
                })
            } else {
                setImgRect({x1: 0, y1: 0, height: (2/3)*origWidthImg, width: origWidthImg})
                setIsEmptyImgRect(false)
                apiWheel({scale: sizeMyParent.width/origWidthImg, onChange: (result) => {
                        updateBounds(result.value.scale)
                    }
                })
            }
        }

        if (isSquare) {
            if (origWidthImg > origHeightImg) {
                setImgRect({x1: 0, y1: 0, height: origHeightImg, width: origHeightImg})
                setIsEmptyImgRect(false)
                apiWheel({scale: sizeMyParent.height/origHeightImg, onChange: (result) => {
                        updateBounds(result.value.scale)
                    }
                })
            } else {
                setImgRect({x1: 0, y1: 0, height: origWidthImg, width: origWidthImg})
                setIsEmptyImgRect(false)
                apiWheel({scale: sizeMyParent.width/origWidthImg, onChange: (result) => {
                        updateBounds(result.value.scale)
                    }
                })
            }
        }
    }

    useEffect(() => {
        handleActiveFigure(isRecActive, isSquareActive)
    }, [isRecActive, isSquareActive]);

    return (
        <>
            <img src={imageWrapper.rectangle} alt="Cut Rectungle"
                 className={`h-full rounded-md transition-all ease-in-out duration-500
                                 ${isRecActive && 'bg-mainGreen/[0.6]'}`}
                 onClick={handleCutRectangle}
            />
            <img src={imageWrapper.square} alt="Cut Square"
                 className={`h-full rounded-md transition-all ease-in-out duration-500
                                 ${isSquareActive && 'bg-mainGreen/[0.6]'}`}
                 onClick={handleCutSquare}
            />
        </>
    );
    };