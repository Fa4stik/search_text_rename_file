import React, {useCallback, useState} from 'react';
import {imageWrapper} from "../../../06_shared/ui/icon";
import {DropDownMenu} from "../../DropDownMenu";
import {TOption} from "../../../06_shared/model/typeSelect";
import {SpringRef, SpringValue} from "react-spring";

type BottomPanelImgWrapProps = {
    isRotate?: boolean
    isZoom?: boolean
    isRefresh?: boolean
    isCut?: boolean
    setCurrRotate: React.Dispatch<React.SetStateAction<number>>
    handleChoseOption?: (e: React.MouseEvent<HTMLSpanElement>, value: string | number) => void
    scale: SpringValue<number>
    setLastScale: React.Dispatch<React.SetStateAction<number>>
    apiWheel: SpringRef<{ scale: number }>
    minSizeScaleImg: number
    maxSizeScaleImg: number
    updateBounds: () => void
    models: TOption[]
    setCurrCrop: React.Dispatch<React.SetStateAction<number>>
}

export const BottomPanelImgWrap: React.FC<BottomPanelImgWrapProps>
    = ({
           isCut,
           isZoom,
           isRefresh,
           isRotate,
           handleChoseOption,
           updateBounds,
           maxSizeScaleImg,
           minSizeScaleImg,
           scale,
           setLastScale,
           setCurrRotate,
           apiWheel,
           models,
           setCurrCrop
       }) => {

    const [isActiveRefresh, setIsActiveRefresh] =
        useState<boolean>(false)
    const [isRecActive, setIsRecActive] =
        useState<boolean>(false)
    const [isSquareActive, setIsSquareActive] = useState<boolean>();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleRotateLeft = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        setCurrRotate(prevState => prevState -= 90)
    };

    const handleRotateRight = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        setCurrRotate(prevState => prevState += 90)
    };

    const handleZoomIn = (e: React.MouseEvent<HTMLImageElement>) => {
        const scaleFactor = 1.1;
        const newScale = scale.get() * scaleFactor;
        setLastScale(newScale);
        const clampedScale = Math.max(minSizeScaleImg, Math.min(newScale, maxSizeScaleImg));
        apiWheel.start({
            scale: clampedScale, onChange: () => {
                updateBounds()
            }
        })
    };

    const handleZoomOut = (e: React.MouseEvent<HTMLImageElement>) => {
        const scaleFactor = 0.9;
        const newScale = scale.get() * scaleFactor;
        setLastScale(newScale);
        const clampedScale = Math.max(minSizeScaleImg, Math.min(newScale, maxSizeScaleImg));
        apiWheel.start({
            scale: clampedScale, onChange: () => {
                updateBounds()
            }
        })
    };

    const handleCutRectangle = () => {
        setIsRecActive(prevState => {
            !prevState ? setCurrCrop(0.66) : setCurrCrop(0)
            return !prevState
        })
        setIsSquareActive(false)
        setIsEdit(false)
    };

    const handleCutSquare = () => {
        setIsRecActive(false)
        setIsEdit(false)
        setIsSquareActive(prevState => {
            !prevState ? setCurrCrop(1) : setCurrCrop(0)
            return !prevState
        })
    };

    const handleRefresh = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        setIsActiveRefresh(prevState => !prevState)
    };

    const handleCut = (e: React.MouseEvent<HTMLImageElement>) => {
        setIsSquareActive(false)
        setIsRecActive(false)
        setIsEdit(prevState => !prevState)
    };

    return (
        <>
            <div className="py-[10px] px-[20px] bottom-[20px] left-1/2 -translate-x-1/2 w-[320px]
                bg-gray-900/[0.7] rounded-xl z-50 absolute h-[50px] flex justify-center gap-x-[10px] cursor-pointer
                after:relative after:-ml-[10px]">
                {isRotate && <>
                    <img src={imageWrapper.left} alt="Left"
                         className="h-full"
                         onClick={handleRotateLeft}
                    />
                    <img src={imageWrapper.right} alt="Right"
                         className="h-full"
                         onClick={handleRotateRight}
                    />
                </>}
                {isZoom && <>
                    <img src={imageWrapper.zoomIn} alt="Zoom In"
                         className="h-full"
                         onClick={handleZoomIn}
                    />
                    <img src={imageWrapper.zoomOut} alt="Zoom Out"
                         className="h-full"
                         onClick={handleZoomOut}
                    />
                </>}
                {isCut &&
                    <>
                        <img src={imageWrapper.rectangle} alt="Cut Rectungle"
                             className={`h-full rounded-md transition-all ease-in-out duration-500 rotate-90
                                 ${isRecActive && 'bg-mainGreen/[0.6]'}`}
                             onClick={handleCutRectangle}
                        />
                        <img src={imageWrapper.square} alt="Cut Square"
                             className={`h-full rounded-md transition-all ease-in-out duration-500
                                 ${isSquareActive && 'bg-mainGreen/[0.6]'}`}
                             onClick={handleCutSquare}
                        />
                        <img src={imageWrapper.cut} alt="Cut Square"
                             className={`h-full rounded-md transition-all ease-in-out duration-500
                                 ${isEdit && 'bg-mainGreen/[0.6]'}`}
                             onClick={handleCut}/>
                    </>}
                {isRefresh &&
                    <img src={imageWrapper.refresh} alt="Regenerate" className="h-full"
                         onClick={handleRefresh}
                    />}
                {isActiveRefresh && <div className="absolute bottom-[55px] -right-[20%] z-50">
                    <DropDownMenu options={models}
                                  setIsActiveRefresh={setIsActiveRefresh}
                                  handleChoseOption={handleChoseOption}
                    />
                </div>}
            </div>
        </>
    );
};