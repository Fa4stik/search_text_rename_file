import React, {useEffect, useRef, useState} from 'react';
import {TBbox, TImgSizes} from "../../../05_entities/RenameFileFetchData";
import {animated, useSpring} from "react-spring";
import {useDrag, useWheel} from "@use-gesture/react";
import {TOption} from "../../../06_shared/model/typeSelect";
import {LoadingDotRight} from "../../../06_shared/ui/loading";
import {BottomPanelImgWrap, TCord, TImgRect} from "../../../05_entities/BottomPanelImgWrap";
import current from "../../../02_pages/renames/current";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

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
    imgRect: TImgSizes
    setImgRect: React.Dispatch<React.SetStateAction<TImgSizes>>
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
                                       imgRect, setImgRect
                                   }) => {

    const [lastScale, setLastScale] = useState<number>(0)
    const [bounds, setBounds] =
        useState<{ left: number, right: number, top: number, bottom: number }>(
            {left: 0, right: 0, top: 0, bottom: 0}
        )

    // Размеры оригинального изображения
    const origImgRef = useRef<HTMLImageElement>(null)
    // Блок с изображение уже отформатированный с учётом зума
    const imgBlockRef = useRef<HTMLImageElement>(null)
    // Размеры окна, в котором изменяется изображение
    const parentRef = useRef<HTMLDivElement>(null)

    // Рассчёт границ для изображения (условно, если изображение не вписывается в parentRef, то мы центрируем его parentRef)
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

    // Тот же самыый расчёт, но только при повороте, заменяем высоту на ширину и наоборот
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

    const updateBounds = () =>
        currRotate % 180 === 0 ? countNewBounds() : countNewBoundsRotate()

    // Хук для перемещения изображения
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

    // Хук для изменения размеров изображения
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

    // При изменении размеров изображения пересчитываем границы для parentRef
    useEffect(() => {
        updateBounds()
    }, [currRotate]);

    // При загрузке изображения вписываем его либо по ширине, либо по высооте
    const handleImageLoad = () => {
        if (origImgRef.current) {
            const width = origImgRef.current.naturalWidth;
            const height = origImgRef.current.naturalHeight;
            const myParSizes = parentRef.current!.getBoundingClientRect()

            imgBlockRef.current!.style.width = `${width}px`;
            imgBlockRef.current!.style.height = `${height}px`;

            setImgRect({x1: 0, y1: 0, width, height})
            setOrigSizes({x1: 0, y1: 0, width, height})

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

    // Crop img
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isStartDrawRect, setIsStartDrawRect] = useState<boolean>(false)
    const [isEmptyImgRect, setIsEmptyImgRect] = useState<boolean>(true)
    const [startCord, setStartCord] = useState<TCord>({x: 0, y: 0})
    const [origImgSizes, setOrigSizes] =
        useState<TImgSizes>({x1: 0, y1: 0, width: 0, height: 0})
    const [isResizeUp, setIsResizeUp] = useState<boolean>(false)
    const [isResizeRight, setIsResizeRight] = useState<boolean>(false)
    const [isResizeDown, setIsResizeDown] = useState<boolean>(false)
    const [isResizeLeft, setIsResizeLeft] = useState<boolean>(false)

    // Получение координат для выделяемого блока
    const getRelativeCord = (e: React.MouseEvent<HTMLDivElement>) => {
        const blockElement = e.currentTarget;
        const blockRect = blockElement.getBoundingClientRect()

        const relativeX = (e.clientX - blockRect.left)/scale.get()
        const relativeY = (e.clientY - blockRect.top)/scale.get()
        return {relativeX, relativeY}
    }

    // Обработка при начале выделения области
    const handleDownRect = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (isEdit && isEmptyImgRect) {
            const blockElement = e.currentTarget;
            const blockRect = blockElement.getBoundingClientRect()

            const relativeX = (e.clientX - blockRect.left)/scale.get()
            const relativeY = (e.clientY - blockRect.top)/scale.get()

            if (currRotate === 0) {
                setStartCord({x: relativeX, y: relativeY})
            }

            if (currRotate === 270) {
                setStartCord({x: blockRect.height/scale.get() - relativeY, y: relativeX })
            }

            if (currRotate === 180) {
                setStartCord({x: blockRect.width/scale.get()-relativeX, y: blockRect.height/scale.get()-relativeY })
            }

            if (currRotate === 90) {
                setStartCord({x: relativeY, y: blockRect.width/scale.get() - relativeX })
            }

            setIsStartDrawRect(true)
            setIsEmptyImgRect(false)
        }
    };

    // Обработка при конце выделения области
    const handleUpRect = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isStartDrawRect) {
            const sizeMyParent = parentRef.current!.getBoundingClientRect()
            if (imgRect.width > imgRect.height) {
                apiWheel({scale: sizeMyParent.width/imgRect.width, onChange: () => {
                        updateBounds()
                    }})
            } else {
                console.log('HEIGHT')
                apiWheel({scale: sizeMyParent.height/imgRect.height, onChange: () => {
                        updateBounds()
                    }})
            }
            setIsStartDrawRect(false)
        }
        setIsResizeUp(false)
        setIsResizeRight(false)
        setIsResizeDown(false)
        setIsResizeLeft(false)
    };

    // Обработка движения выделения
    const handleMoveRect = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isStartDrawRect) {
            const blockElement = e.currentTarget;
            const blockRect = blockElement.getBoundingClientRect()

            const relativeX = (e.clientX - blockRect.left)/scale.get()
            const relativeY = (e.clientY - blockRect.top)/scale.get()

            let x1: number, y1: number, width: number, height: number;

            if (currRotate === 0) {
                x1 = Math.min(startCord.x, relativeX);
                y1 = Math.min(startCord.y, relativeY);
                width = Math.abs(relativeX - startCord.x);
                height = Math.abs(relativeY - startCord.y);
            }

            if (currRotate === 270) {
                y1 = Math.min(startCord.y, relativeX);
                x1 = Math.min((blockRect.height/scale.get() - relativeY), startCord.x);
                height = Math.abs(relativeX - startCord.y)
                width = Math.abs((blockRect.height/scale.get() - relativeY) - startCord.x)
            }

            if (currRotate === 180) {
                x1 = Math.min(blockRect.width/scale.get()-relativeX, startCord.x);
                y1 = Math.min(blockRect.height/scale.get()-relativeY, startCord.y);
                width = Math.abs(blockRect.width/scale.get()-relativeX - startCord.x);
                height = Math.abs(blockRect.height/scale.get()-relativeY - startCord.y);
            }

            if (currRotate === 90) {
                y1 = Math.min((blockRect.width/scale.get() - relativeX), startCord.y);
                x1 = Math.min(startCord.x, relativeY);
                height = Math.abs((blockRect.width/scale.get() - relativeX) - startCord.y)
                width = Math.abs(relativeY - startCord.x)
            }

            setImgRect(prevState => ({ x1, y1, width, height }));
        }

        if (isResizeUp) {
            const {relativeY} = getRelativeCord(e)
            const deltaY = relativeY - imgRect.y1;
            setImgRect(prevState => ({
                ...prevState,
                y1: relativeY,
                height: prevState.height - deltaY
            }));
        }

        if (isResizeRight) {
            const { relativeX } = getRelativeCord(e)
            const deltaX = relativeX - (imgRect.x1 + imgRect.width);
            setImgRect(prevState => ({
                ...prevState,
                width: prevState.width + deltaX
            }));
        }

        if (isResizeDown) {
            const { relativeY } = getRelativeCord(e)
            const deltaY = relativeY - (imgRect.y1+imgRect.height)
            setImgRect(prevState => ({
                ...prevState,
                height: prevState.height + deltaY
            }));
        }

        if (isResizeLeft) {
            const {relativeX} = getRelativeCord(e)
            const deltaX = relativeX - imgRect.x1;
            setImgRect(prevState => ({
                ...prevState,
                x1: relativeX,
                width: prevState.width - deltaX
            }));
        }
    };

    // Обработка если курсор вышел за пределлы текущего изображения
    const handleLeaveMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isStartDrawRect) {
            const blockElement = e.currentTarget;
            const blockRect = blockElement.getBoundingClientRect()

            const relativeX = (e.clientX - blockRect.left)/scale.get()
            const relativeY = (e.clientY - blockRect.top)/scale.get()

            let x1: number, y1: number, width: number, height: number;

            if (currRotate === 0) {
                x1 = Math.min(startCord.x, relativeX);
                y1 = Math.min(startCord.y, relativeY);
                width = Math.abs(relativeX - startCord.x);
                height = Math.abs(relativeY - startCord.y);
            }

            if (currRotate === 270) {
                y1 = Math.min(startCord.y, relativeX);
                x1 = Math.min((blockRect.height/scale.get() - relativeY), startCord.x);
                height = Math.abs(relativeX - startCord.y) - 5
                width = Math.abs((blockRect.height/scale.get() - relativeY) - startCord.x) - 5
            }

            if (currRotate === 180) {
                x1 = Math.min(blockRect.width/scale.get()-relativeX, startCord.x);
                y1 = Math.min(blockRect.height/scale.get()-relativeY, startCord.y);
                width = Math.abs(blockRect.width/scale.get()-relativeX - startCord.x);
                height = Math.abs(blockRect.height/scale.get()-relativeY - startCord.y);
            }

            if (currRotate === 90) {
                y1 = Math.min((blockRect.width/scale.get() - relativeX), startCord.y);
                x1 = Math.min(startCord.x, relativeY);
                height = Math.abs((blockRect.width/scale.get() - relativeX) - startCord.y)
                width = Math.abs(relativeY - startCord.x)
            }

            setImgRect(prevState => ({ x1, y1, width, height }));
            setIsStartDrawRect(false)
        }
        setIsResizeUp(false)
        setIsResizeRight(false)
        setIsResizeDown(false)
        setIsResizeLeft(false)
    };

    // Обработка при изменении границ изображения
    useEffect(() => {
        const sizeMyParent = parentRef.current!.getBoundingClientRect()
        if (imgRect.width > imgRect.height) {
            apiDrag.start({x: bounds.right - imgRect.x1+20, y: bounds.bottom-imgRect.y1+20})
        } else {
            apiDrag.start({x: -(Math.abs(bounds.right)+imgRect.x1/2), y: -(Math.abs(bounds.bottom)+imgRect.y1)+20})
        }
    }, [bounds])

    // Обработка для выделения облоасти изображения
    useEffect(() => {
        !isEdit && setImgRect(origImgSizes)
    }, [isEdit]);

    return (
        <div className="flex-1 flex overflow-hidden cursor-grab">
            {isDark && <svg xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            style={{position: 'absolute'}}>
                <defs>
                    <clipPath id="contentMask">
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
                    <clipPath id="cropMask">
                        <rect x={imgRect.x1}
                              y={imgRect.y1}
                              width={imgRect.width}
                              height={imgRect.height}
                        />
                    </clipPath>
                </defs>
            </svg>}
            <div className="flex-1 overflow-hidden relative"
                 ref={parentRef}
            >
                {isLoading &&
                    <LoadingDotRight/>}
                <div>
                    <animated.div className={`relative`}
                                  ref={imgBlockRef}
                                  {...(!isEdit && bindDrag())}
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
                        {!isEdit &&
                            <div className="absolute z-30"
                                 style={{
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
                            </div>}
                        {isDark && <>
                            <div className={`bg-black/[0.5] absolute w-full h-full left-0 top-0 z-10 ${isEdit ? 'cursor-copy': 'cursor-grab'}`}
                                 style={{
                                     transform: `rotate(${currRotate}deg)`,
                                     transformOrigin: 'center'
                                 }}
                                 onMouseDown={handleDownRect}
                                 onMouseUp={handleUpRect}
                                 onMouseMove={handleMoveRect}
                                 onMouseLeave={handleLeaveMouse}
                            >
                                {isEdit && !isEmptyImgRect && <svg xmlns="http://www.w3.org/2000/svg"
                                                                   xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                   className="absolute z-50 w-full h-full top-0 left-0"
                                >
                                    <line x1={imgRect.x1} y1={imgRect.y1}
                                          x2={imgRect.x1 + imgRect.width} y2={imgRect.y1}
                                          stroke="black"
                                          strokeWidth={5}
                                          className="cursor-row-resize z-50"
                                          // onMouseDown={() => {
                                          //     setIsResizeUp(true)
                                          // }}
                                    />
                                    <line x1={imgRect.x1 + imgRect.width} y1={imgRect.y1}
                                          x2={imgRect.x1 + imgRect.width} y2={imgRect.y1 + imgRect.height}
                                          stroke="black"
                                          strokeWidth={5}
                                          className="cursor-col-resize z-50"
                                          // onMouseDown={() => {
                                          //     setIsResizeRight(true)
                                          // }}
                                    />
                                    <line x1={imgRect.x1} y1={imgRect.y1 + imgRect.height}
                                          x2={imgRect.x1 + imgRect.width} y2={imgRect.y1 + imgRect.height}
                                          strokeWidth={5}
                                          stroke="black"
                                          className="cursor-row-resize z-50"
                                          // onMouseDown={() => {
                                          //     setIsResizeDown(true)
                                          // }}
                                    />
                                    <line x1={imgRect.x1} y1={imgRect.y1}
                                          x2={imgRect.x1} y2={imgRect.y1 + imgRect.height}
                                          stroke="black"
                                          strokeWidth={5}
                                          className="cursor-col-resize z-50"
                                          // onMouseDown={() => {
                                          //     setIsResizeLeft(true)
                                          // }}
                                    />
                                </svg>}
                                <img src={srcImg}
                                     className="h-full max-h-none max-w-none z-20"
                                     style={{
                                         // transform: `rotate(${currRotate}deg)`,
                                         // transformOrigin: 'center',
                                         clipPath: `${isEdit ? 'url(#cropMask)' : 'url(#contentMask)'}`,
                                     }}
                                     alt="MyImg"/>
                            </div>
                        </>}
                    </animated.div>
                </div>
                <BottomPanelImgWrap
                    isCut isRefresh isRotate isZoom
                    isEdit={isEdit}
                    setLastScale={setLastScale}
                    updateBounds={updateBounds}
                    setCurrRotate={setCurrRotate}
                    apiWheel={apiWheel}
                    maxSizeScaleImg={maxSizeScaleImg}
                    minSizeScaleImg={minSizeScaleImg}
                    scale={scale}
                    handleChoseOption={handleChoseOption}
                    models={models}
                    setCurrCrop={setCurrCrop}
                    setImgRect={setImgRect}
                    setIsEmptyImgRect={setIsEmptyImgRect}
                    setIsEdit={setIsEdit}
                    origImgSizes={origImgSizes}
                />
            </div>
        </div>
    );
};