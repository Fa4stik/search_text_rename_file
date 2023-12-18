import React, {useState} from 'react';
import {imageWrapper} from "../../../06_shared/ui/icon";
import {DropDownMenu} from "../../DropDownMenu";
import {TOption} from "../../../06_shared/model/typeSelect";
import {SpringRef, SpringValue} from "react-spring";
import {TImgSizes} from "../../FetchPipeline";

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
    isEdit: boolean
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    setIsEmptyImgRect: React.Dispatch<React.SetStateAction<boolean>>
    setImgRect: React.Dispatch<React.SetStateAction<TImgSizes>>
    origImgSizes: TImgSizes
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
           setCurrCrop,
           setImgRect,
           setIsEmptyImgRect,
           setIsEdit,
           isEdit, origImgSizes
       }) => {

    const [isActiveRefresh, setIsActiveRefresh] =
        useState<boolean>(false)
    const [isRecActive, setIsRecActive] =
        useState<boolean>(false)
    const [isSquareActive, setIsSquareActive] = useState<boolean>();

    const handleRotateLeft = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrRotate(prevState => prevState-90 < 0
            ? prevState = 270
            : prevState -= 90
        )
    };

    const handleRotateRight = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrRotate(prevState => prevState+90 === 360
            ? prevState = 0
            : prevState += 90
        )
    };

    const handleZoomIn = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        const scaleFactor = 0.001;
        const newScale = scale.get() + 102 * scaleFactor;
        setLastScale(prevState => prevState-102);
        const clampedScale = Math.max(minSizeScaleImg, Math.min(newScale, maxSizeScaleImg));
        apiWheel.start({scale: clampedScale, onChange: () => {
                updateBounds()
            }})
    };

    const handleZoomOut = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        const scaleFactor = 0.001;
        const newScale = scale.get() - 102 * scaleFactor;
        setLastScale(prevState => prevState+102);
        const clampedScale = Math.max(minSizeScaleImg, Math.min(newScale, maxSizeScaleImg));
        apiWheel.start({scale: clampedScale, onChange: () => {
                updateBounds()
            }})
    };

    const handleCutRectangle = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        setIsRecActive(prevState => {
            !prevState ? setCurrCrop(0.66) : setCurrCrop(0)
            return !prevState
        })
        setIsSquareActive(false)
        setIsEdit(false)
        setImgRect(origImgSizes)
    };

    const handleCutSquare = () => {
        setIsRecActive(false)
        setIsEdit(false)
        setIsSquareActive(prevState => {
            !prevState ? setCurrCrop(1) : setCurrCrop(0)
            return !prevState
        })
        setImgRect(origImgSizes)
    };

    const handleRefresh = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsActiveRefresh(prevState => !prevState)
    };

    const handleCut = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        setIsSquareActive(false)
        setIsRecActive(false)
        setIsEdit(prevState => {
            !prevState && setImgRect({x1: 0, width: 0, y1: 0, height: 0})
            return !prevState
        })
        setIsEmptyImgRect(true)
    };

    return (
        <>
            <div className="py-[10px] px-[20px] bottom-[20px] left-1/2 -translate-x-1/2 w-[320px]
                bg-gray-900/[0.7] rounded-xl z-50 absolute h-[50px] flex justify-center gap-x-[10px] cursor-pointer
                after:relative after:-ml-[10px]"
                 // onClick={(e) => e.stopPropagation()}
            >
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
                                  setIsEdit={setIsEdit}
                    />
                </div>}
            </div>
        </>
    );
};