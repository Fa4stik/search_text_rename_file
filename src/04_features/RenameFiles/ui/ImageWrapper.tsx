import React, {useRef, useState} from 'react';
import {TBbox, TImgSizes} from "../../../05_entities/RenameFileFetchData";
import {animated, useSpring} from "react-spring";
import {useDrag, useWheel} from "@use-gesture/react";
import {imageWrapper} from "../../../06_shared/ui/icon";
import {DropDownMenu} from "../../../05_entities/DropDownMenu";
import {TOption} from "../../../06_shared/model/typeSelect";
import {LoadingDotRight} from "../../../06_shared/ui/loading";

const minSizeScaleImg = 0.1
const maxSizeScaleImg = 15

type ImageWrapperProps = {
    myBoxes: TBbox[];
    handleClickBox: (e: React.MouseEvent<HTMLDivElement>, word: string) => void;
    srcImg: string
    isDark?: boolean
    isRotate?: boolean
    isZoom?: boolean
    isRefresh?: boolean
    isCut?: boolean
    isLoading?: boolean
    handleChoseOption?: (e: React.MouseEvent<HTMLSpanElement>, value: string | number) => void
    models: TOption[],
    currRotate: number,
    setCurrRotate: React.Dispatch<React.SetStateAction<number>>
    setCurrCrop: React.Dispatch<React.SetStateAction<number>>
    setImgSizes: React.Dispatch<React.SetStateAction<TImgSizes>>
}

export const ImageWrapper:
    React.FC<ImageWrapperProps> = ({
                                       isDark,
                                       srcImg,
                                       myBoxes,
                                       handleClickBox,
                                       isZoom,
                                       isRefresh,
                                       isRotate,
                                       handleChoseOption,
                                       models,
                                       setCurrRotate,
                                       setCurrCrop,
                                       currRotate,
                                       isCut,
                                       isLoading,
                                       setImgSizes
                                   }) => {

    const [lastScale, setLastScale] = useState<number>(0)
    const [isActiveRefresh, setIsActiveRefresh] =
        useState<boolean>(false)
    const [bounds, setBounds] =
        useState<{ left: number, right: number, top: number, bottom: number }>(
            {left: 0, right: 0, top: 0, bottom: 0}
        )
    const [isRecActive, setIsRecActive] =
        useState<boolean>(false)
    const [isSquareActive, setIsSquareActive] =
        useState<boolean>(false)

    const origImgRef = useRef<HTMLImageElement>(null)
    const imgBlockRef = useRef<HTMLImageElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)

    const countNewBounds = () => {
        const sizeMyImg = imgBlockRef.current!.getBoundingClientRect()
        const sizeMyParent = parentRef.current!.getBoundingClientRect()
        const origWidthImg = sizeMyImg.width / scale.get();
        const origHeightImg = sizeMyImg.height / scale.get();

        let newRight = -(origWidthImg - sizeMyImg.width) / 2;
        let newBottom = -(origHeightImg - sizeMyImg.height) / 2
        let newLeft = -(sizeMyImg.width - sizeMyParent.width) + newRight
        let newTop = -(sizeMyImg.height - sizeMyParent.height) + newBottom

        const centerX = (sizeMyParent.width - origWidthImg) / 2
        const centerY = (sizeMyParent.height - origHeightImg) / 2

        const tempBottom = newBottom;
        newBottom = newBottom < newTop ? centerY : newBottom
        newTop = newTop > tempBottom ? centerY : newTop

        const tempRight = newRight;
        newRight = newRight < newLeft ? centerX : newRight
        newLeft = newLeft > tempRight ? centerX : newLeft

        setBounds({
            bottom: newBottom,
            right: newRight,
            left: newLeft,
            top: newTop
        })

        if (x.get() > newRight)
            apiDrag.start({x: newRight})

        if (x.get() < newLeft)
            apiDrag.start({x: newLeft})

        if (y.get() > newBottom)
            apiDrag.start({y: newBottom})

        if (y.get() < newTop)
            apiDrag.start({y: newTop})
    }

    const countNewBoundsRotate = () => {
        const sizeMyImg = imgBlockRef.current!.getBoundingClientRect()
        const sizeMyParent = parentRef.current!.getBoundingClientRect()
        const origWidthImg = sizeMyImg.height / scale.get();
        const origHeightImg = sizeMyImg.width / scale.get();

        let newRight = -(origHeightImg - sizeMyImg.height) / 2;
        let newBottom = -(origWidthImg - sizeMyImg.width) / 2
        let newLeft = -(sizeMyImg.height - sizeMyParent.width) + newRight
        let newTop = -(sizeMyImg.width - sizeMyParent.height) + newBottom

        const centerX = (sizeMyParent.width - origHeightImg) / 2
        const centerY = (sizeMyParent.height - origWidthImg) / 2

        const tempBottom = newBottom;
        newBottom = newBottom < newTop ? centerY : newBottom
        newTop = newTop > tempBottom ? centerY : newTop

        const tempRight = newRight;
        newRight = newRight < newLeft ? centerX : newRight
        newLeft = newLeft > tempRight ? centerX : newLeft

        setBounds({
            bottom: newBottom,
            right: newRight,
            left: newLeft,
            top: newTop
        })

        if (x.get() > newRight)
            apiDrag.start({x: newRight})

        if (x.get() < newLeft)
            apiDrag.start({x: newLeft})

        if (y.get() > newBottom)
            apiDrag.start({y: newBottom})

        if (y.get() < newTop)
            apiDrag.start({y: newTop})
    }

    const updateBounds = () => {
        if (currRotate % 180 === 0)
            countNewBounds()
        else
            countNewBoundsRotate()
    }

    const [{x, y}, apiDrag] =
        useSpring(() => (
            {x: 0, y: 0}))

    const bindDrag = useDrag(({
                                  down,
                                  offset: [ox, oy]
                              }) => {
        apiDrag.start({x: ox, y: oy, immediate: down})
    }, {
        bounds,
        eventOptions: {capture: true},
        rubberband: true
    })

    const [{scale}, apiWheel] =
        useSpring(() => ({scale: 1}))

    const bindWheel = useWheel(({offset: [dx, dy]}) => {
        const scaleFactor = 0.003;
        const newScale = scale.get() - (dy - lastScale) * scaleFactor;
        setLastScale(dy);
        const clampedScale = Math.max(minSizeScaleImg, Math.min(newScale, maxSizeScaleImg));
        apiWheel.start({scale: clampedScale})

        updateBounds()
    }, {})

    const handleImageLoad = () => {
        if (origImgRef.current) {
            const width = origImgRef.current.naturalWidth;
            const height = origImgRef.current.naturalHeight;
            const myParSizes = parentRef.current!.getBoundingClientRect()

            imgBlockRef.current!.style.width = `${width}px`;
            imgBlockRef.current!.style.height = `${height}px`;

            setImgSizes({x1: 0, y1: 0, width, height})

            if (width > height)
                apiWheel.start({
                    scale: myParSizes.width / width, onChange: () => {
                        countNewBounds()
                    }
                })
            else
                apiWheel.start({
                    scale: myParSizes.height / height, onChange: () => {
                        countNewBounds()
                    }
                })
        }
        countNewBounds()
    }

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

    const handleRotateLeft = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        setCurrRotate(prevState => {
            prevState -= 90;
            if (prevState % 180 === 0)
                countNewBounds()
            else
                countNewBoundsRotate()
            return prevState
        })
    };

    const handleRotateRight = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        setCurrRotate(prevState => {
            prevState += 90;
            if (prevState % 180 === 0)
                countNewBounds()
            else
                countNewBoundsRotate()
            return prevState
        })
    };

    const handleRefresh = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        setIsActiveRefresh(prevState => !prevState)
    };

    const handleCutRectangle = () => {
        setIsRecActive(prevState => {
            !prevState ? setCurrCrop(0.66) : setCurrCrop(0)
            return !prevState
        })
        setIsSquareActive(false)
    };

    const handleCutSquare = () => {
        setIsRecActive(false)
        setIsSquareActive(prevState => {
            !prevState ? setCurrCrop(1) : setCurrCrop(0)
            return !prevState
        })
    };

    return (
        <div className="flex-1 flex overflow-hidden cursor-grab">
            {isDark && <svg xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            style={{position: 'absolute'}}>
                <defs>
                    <clipPath id="myMask">
                        {myBoxes.map((box, id) => (
                            <rect key={id}
                                  x={box.x}
                                  y={box.y}
                                  width={box.w}
                                  height={box.h}
                                  rx="5"
                            />
                        ))}
                    </clipPath>
                </defs>
            </svg>}
            <div className="flex-1 overflow-hidden relative"
                 ref={parentRef}
            >
                {isLoading &&
                    <LoadingDotRight/>}
                <div>
                    <animated.div className="relative"
                                  ref={imgBlockRef}
                                  {...bindDrag()}
                                  {...bindWheel()}
                                  style={{
                                      x, y,
                                      transform: scale.to(s => `scale(${s})`),
                                      transformOrigin: 'center'
                                  }}
                                  onDragStart={(e) => e.preventDefault()}
                    >
                        <img src={srcImg}
                             ref={origImgRef}
                             onLoad={handleImageLoad}
                             className="h-full max-h-none max-w-none absolute z-0"
                             style={{
                                 transform: `rotate(${currRotate}deg)`,
                                 transformOrigin: 'center'
                             }}
                             alt="MyImg"/>
                        <div className="absolute z-30"
                             style={{
                                 top: 0,
                                 left: 0,
                                 width: '100%',
                                 height: '100%',
                                 transform: `rotate(${currRotate}deg)`,
                                 transformOrigin: 'center'
                             }}
                        >
                            {myBoxes.map((box, id) => (
                                <div className={`absolute ring-1 ring-mainGreen rounded-[5px] cursor-pointer`}
                                     onMouseDown={(e) => handleClickBox(e, box.word)}
                                     key={id}
                                     style={{
                                         width: `${box.w}px`,
                                         height: `${box.h}px`,
                                         top: `${box.y}px`,
                                         left: `${box.x}px`,
                                     }}
                                />
                            ))}
                        </div>
                        {isDark && <>
                            <div className="bg-black/[0.5] absolute w-full h-full left-0 top-0 z-10"
                                 style={{
                                     transform: `rotate(${currRotate}deg)`,
                                     transformOrigin: 'center'
                                 }}
                            />
                            <img src={srcImg}
                                 className="h-full max-h-none max-w-none absolute z-20"
                                 style={{
                                     clipPath: 'url(#myMask)',
                                     transform: `rotate(${currRotate}deg)`,
                                     transformOrigin: 'center'
                                 }}
                                 alt="MyImg"/>
                        </>}
                    </animated.div>
                </div>
                <div className="py-[10px] px-[20px] bottom-[20px] left-1/2 -translate-x-1/2 w-[280px]
                bg-gray-900/[0.7] rounded-xl z-50 absolute h-[50px] flex justify-center gap-x-[10px] cursor-pointer">
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
                                 className={`h-full rounded-md transition-all ease-in-out duration-500
                                 ${isRecActive && 'bg-mainGreen/[0.6]'}`}
                                 onClick={handleCutRectangle}
                            />
                            <img src={imageWrapper.square} alt="Cut Square"
                                 className={`h-full rounded-md transition-all ease-in-out duration-500
                                 ${isSquareActive && 'bg-mainGreen/[0.6]'}`}
                                 onClick={handleCutSquare}
                            />
                        </>}
                    {isRefresh &&
                        <img src={imageWrapper.refresh} alt="Regenerate" className="h-full"
                             onClick={handleRefresh}
                        />}
                </div>
                {isActiveRefresh && <div className="absolute bottom-[75px] left-1/2 z-50">
                    <DropDownMenu options={models}
                                  setIsActiveRefresh={setIsActiveRefresh}
                                  handleChoseOption={handleChoseOption}
                    />
                </div>}
            </div>
        </div>
    );
};