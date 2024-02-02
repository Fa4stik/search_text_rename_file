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
    rotate: number
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
    setIsRecRotate,
    rotate
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

    const rotateRect = (x1: number, y1: number, height: number, width: number,
                        currOrigHeightImg: number, currOrigWidthImg: number) => {
        console.log(rotate)

        if ([90, 270].includes(rotate)) {
            width = [height, height = width][0]
        }

        if (rotate === 270) {
            x1 = currOrigHeightImg - width
        }

        if (rotate === 180) {
            y1 = currOrigHeightImg - height
            x1 = currOrigWidthImg - width
        }

        if (rotate === 90) {
            y1 = currOrigWidthImg - height
        }

        return {x1, y1, width, height}
    }

    const handleActiveFigure = (isRecHor: boolean, isRecVer: boolean, isSquare: boolean) => {
        setIsRec(isRecHor)
        setIsSquare(isSquare)
        setIsRecRotate(isRecVer)
        const sizeMyParent = parentRef.current!.getBoundingClientRect()
        const {width: sizeMyImgW, height: sizeMyImgH} = imgBlockRef.current!.getBoundingClientRect()
        const origWidthImg = sizeMyImgW / apiWheel.current[0].get().scale;
        const origHeightImg = sizeMyImgH / apiWheel.current[0].get().scale;
        const deltaDistance = 60;

        if (isRecHor) {
            if (origWidthImg > origHeightImg) {
                let x1 = 0, y1 = 0, height = origHeightImg, width = (3/2)*origHeightImg

                const updateCords =
                    rotateRect(x1, y1, height, width, origHeightImg, origWidthImg)

                setImgRect({...updateCords})
                setIsEmptyImgRect(false)
                apiWheel({scale: (sizeMyParent.height)/width,
                    onChange: (result) => {
                        updateBounds(result.value.scale)
                    }
                })
            }

            if (origWidthImg <= origHeightImg) {
                let x1 = 0, y1 = 0, height = (2/3)*origWidthImg, width = origWidthImg

                const updateCords =
                    rotateRect(x1, y1, height, width, origHeightImg, origWidthImg)

                setImgRect({...updateCords})
                setIsEmptyImgRect(false)
                apiWheel({scale: (sizeMyParent.width)/origWidthImg,
                    onChange: (result) => {
                        updateBounds(result.value.scale)
                    }
                })
            }
        }

        if (isRecVer) {
            if (origWidthImg > origHeightImg) {
                let x1 = 0, y1 = 0, height = origHeightImg, width = (2/3) * origHeightImg

                const updateCords =
                    rotateRect(x1, y1, height, width, origHeightImg, origWidthImg)

                setImgRect({...updateCords})
                setIsEmptyImgRect(false)
                apiWheel({scale: (sizeMyParent.height - deltaDistance)/origHeightImg,
                    onChange: (result) => {
                        updateBounds(result.value.scale)
                    }
                })
            }

            if (origWidthImg <= origHeightImg) {
                let x1 = 0, y1 = 0, height = (3/2)*origWidthImg, width = origWidthImg

                const updateCords =
                    rotateRect(x1, y1, height, width, origHeightImg, origWidthImg)

                setImgRect({...updateCords})
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
                let x1 = 0, y1 = 0, height = origHeightImg, width = origHeightImg

                const updateCords =
                    rotateRect(x1, y1, height, width, origHeightImg, origWidthImg)

                setImgRect({...updateCords})
                setIsEmptyImgRect(false)
                apiWheel({scale: (sizeMyParent.height - deltaDistance)/origHeightImg,
                    onChange: (result) => {
                        updateBounds(result.value.scale)
                    }
                })
            }

            if (origWidthImg <= origHeightImg) {
                let x1 = 0, y1 = 0, height = origWidthImg, width = origWidthImg

                const updateCords =
                    rotateRect(x1, y1, height, width, origHeightImg, origWidthImg)

                setImgRect({...updateCords})
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