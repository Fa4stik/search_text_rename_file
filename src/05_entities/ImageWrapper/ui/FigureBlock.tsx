import React, {useEffect, useState} from 'react';
import {imageWrapper} from "../../../06_shared/ui/icon";
import {TImgSizes} from "../../FetchPipeline";
import {SpringRef} from "react-spring";

type FigureBlockProps = {
    setImgRect: React.Dispatch<React.SetStateAction<TImgSizes>>,
    setIsRec: (value: React.SetStateAction<boolean>) => void,
    setIsRecRotate: (value: React.SetStateAction<boolean>) => void
    setIsSquare: (value: React.SetStateAction<boolean>) => void,
    parentRef: React.RefObject<HTMLDivElement>,
    imgBlockRef: React.RefObject<HTMLDivElement>,
    apiWheel: SpringRef<{scale: number}>,
    setIsEmptyImgRect: (value: React.SetStateAction<boolean>) => void
    updateBounds: (scale: number) => void
    resetTools: boolean
}

export const FigureBlock: React.FC<FigureBlockProps> = ({
    setImgRect,
    setIsRec,
    setIsSquare,
    imgBlockRef,
    parentRef,
    apiWheel,
    setIsEmptyImgRect,
    updateBounds,
    resetTools,
    setIsRecRotate
}) => {

    const [isRecActive, setIsRecActive] =
        useState<boolean>(false)
    const [isRecRotateActive, setIsRecRotateActive] =
        useState<boolean>(false)
    const [isSquareActive, setIsSquareActive] =
        useState<boolean>(false)

    const handleCutRectangle = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        setIsRecActive(prevState => !prevState)
        setIsSquareActive(false)
        setIsRecRotateActive(false)
    };

    const handleCutRectangleRotate = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        setIsRecRotateActive(prevState => !prevState)
        setIsRecActive(false)
        setIsSquareActive(false)
    };

    const handleCutSquare = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        setIsSquareActive(prevState => !prevState)
        setIsRecActive(false)
        setIsRecRotateActive(false)
    };

    const handleActiveFigure = (isRec: boolean, isRecRotate: boolean, isSquare: boolean) => {
        setIsRec(isRec)
        setIsSquare(isSquare)
        setIsRecRotate(isRecRotate)
        const sizeMyParent = parentRef.current!.getBoundingClientRect()
        const sizeMyImg = imgBlockRef.current!.getBoundingClientRect()
        const origWidthImg = sizeMyImg.width / apiWheel.current[0].get().scale;
        const origHeightImg = sizeMyImg.height / apiWheel.current[0].get().scale;
        const deltaDistance = 60;
        if (isRec) {
            if (origWidthImg > origHeightImg) {
                const width = (3/2)*origHeightImg
                setImgRect({x1: 0, y1: 0, height: origHeightImg, width})
                setIsEmptyImgRect(false)
                apiWheel({scale: (sizeMyParent.height)/width,
                    onChange: (result) => {
                        updateBounds(result.value.scale)
                    }
                })
            } else {
                setImgRect({x1: 0, y1: 0, height: (2/3)*origWidthImg, width: origWidthImg})
                setIsEmptyImgRect(false)
                apiWheel({scale: (sizeMyParent.width)/origWidthImg,
                    onChange: (result) => {
                        updateBounds(result.value.scale)
                    }
                })
            }
        }

        if (isRecRotate) {
            if (origWidthImg > origHeightImg) {
                setImgRect({x1: 0, y1: 0, height: (2/3)*origWidthImg, width: origWidthImg})
                setIsEmptyImgRect(false)
                apiWheel({scale: (sizeMyParent.width - deltaDistance)/origWidthImg,
                    onChange: (result) => {
                        updateBounds(result.value.scale)
                    }
                })
            } else {
                const width = (3/2)*origWidthImg
                setImgRect({x1: 0, y1: 0, height: width, width: origWidthImg})
                setIsEmptyImgRect(false)
                apiWheel({scale: (sizeMyParent.height - deltaDistance*2)/width,
                    onChange: (result) => {
                        updateBounds(result.value.scale)
                    }
                })
            }
        }

        if (isSquare) {
            if (origWidthImg > origHeightImg) {
                setImgRect({x1: 0, y1: 0, height: origHeightImg, width: origHeightImg})
                setIsEmptyImgRect(false)
                apiWheel({scale: (sizeMyParent.height - deltaDistance)/origHeightImg,
                    onChange: (result) => {
                        updateBounds(result.value.scale)
                    }
                })
            } else {
                setImgRect({x1: 0, y1: 0, height: origWidthImg, width: origWidthImg})
                setIsEmptyImgRect(false)
                apiWheel({scale: (sizeMyParent.height - deltaDistance*2)/origWidthImg,
                    onChange: (result) => {
                        updateBounds(result.value.scale)
                    }
                })
            }
        }
    }

    useEffect(() => {
        handleActiveFigure(isRecActive, isRecRotateActive, isSquareActive)
    }, [isRecActive, isRecRotateActive, isSquareActive]);

    useEffect(() => {
        setIsRecActive(false)
        setIsRecRotateActive(false)
        setIsSquareActive(false)
    }, [resetTools]);

    return (
        <>
            <img src={imageWrapper.rectangle} alt="Cut Rectungle"
                 className={`h-full rounded-md transition-all ease-in-out duration-500
                                 ${isRecActive && 'bg-mainGreen/[0.6]'}`}
                 onClick={handleCutRectangle}
            />
            <img src={imageWrapper.rectangle} alt="Cut Rectungle"
                 className={`h-full rounded-md transition-all ease-in-out duration-500 rotate-90
                                 ${isRecRotateActive && 'bg-mainGreen/[0.6]'}`}
                 onClick={handleCutRectangleRotate}
            />
            <img src={imageWrapper.square} alt="Cut Square"
                 className={`h-full rounded-md transition-all ease-in-out duration-500
                                 ${isSquareActive && 'bg-mainGreen/[0.6]'}`}
                 onClick={handleCutSquare}
            />
        </>
    );
};