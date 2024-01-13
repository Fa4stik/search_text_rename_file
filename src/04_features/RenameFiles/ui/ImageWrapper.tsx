import React, {useEffect, useRef, useState} from 'react';
import {animated, useSpring} from "react-spring";
import {TOption} from "../../../06_shared/model/typeSelect";
import {LoadingDotRight} from "../../../06_shared/ui/loading";
import {TBbox, TImgSizes} from "../../../05_entities/FetchPipeline";
import {
    BottomPanelImgWrap, CutBlock, FigureBlock,
    ImgRectBlock,
    Masks, RefreshBlock, RotateBlock,
    TCord,
    useCountBounds, useImgStore,
    useMyDrag,
    useMyWheel, ZoomBlock
} from "../../../05_entities/ImageWrapper";
import {TBounds} from "../../../05_entities/ImageWrapper/model/dragTypes";

const maxSizeScaleImg = 200
const speedZoom = 0.05

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
    resetTools: boolean
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({
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
    imgRect, setImgRect, resetTools
}) => {

    const [minSizeScaleImg, setMinSizeScaleImg] =
        useState<number>(0.1)
    const [bounds, setBounds] =
        useState<TBounds>({left: 0, right: 0, top: 0, bottom: 0})
    const [isImmediateDrag, setIsImmediateDrag] =
        useState<boolean>(true)
    const [scaleFactor, setScaleFactor] =
        useState<number>(0.5)
    const [isHiddenBottomPanel, setIsHiddenBottomPanel] =
        useState<boolean>(false)
    const [isRec, setIsRec] =
        useState<boolean>(false)
    const [isSquare, setIsSquare] =
        useState<boolean>(false)

    // Размеры оригинального изображения
    const origImgRef = useRef<HTMLImageElement>(null)
    // Блок с изображение уже отформатированный с учётом зума
    const imgBlockRef = useRef<HTMLDivElement>(null)
    // Размеры окна, в котором изменяется изображение
    const parentRef = useRef<HTMLDivElement>(null)

    // Рассчёт границ для изображения (условно, если изображение не вписывается в parentRef, то мы центрируем его parentRef)
    const countNewBounds = (scale: number, isRotate = false) => {
        const parSizes = parentRef.current!.getBoundingClientRect();
        let origImgW = origImgRef.current!.naturalWidth
        let origImgH = origImgRef.current!.naturalHeight
        let imgSizesW = origImgW*scale
        let imgSizesH = origImgH*scale

        // Разница при повороте
        let startX = 0
        let startY = 0

        if (isRotate) {
            startX -= (imgSizesW - imgSizesH)/2
            startY += (imgSizesW - imgSizesH)/2
            imgSizesW = [imgSizesH, imgSizesH = imgSizesW][0]
        }

        if (parSizes.width >= imgSizesW) {
            const newRight = (parSizes.width-imgSizesW)/2 + startX
            setBounds(prevState => ({
                ...prevState,
                left: newRight,
                right: newRight
            }))
        }

        if (parSizes.height >= imgSizesH) {
            const newBottom = (parSizes.height - imgSizesH)/2 + startY
            setBounds(prevState => ({
                ...prevState,
                bottom: newBottom,
                top: newBottom
            }))
        }

        if (parSizes.height < imgSizesH) {
            const newBottom = startY
            const newTop = startY - (imgSizesH - parSizes.height)
            setBounds(prevState => ({
                ...prevState,
                bottom: newBottom,
                top: newTop
            }))
        }

        if (parSizes.width < imgSizesW) {
            const newRight = startX
            const newLeft = startX - (imgSizesW - parSizes.width)
            setBounds(prevState => ({
                ...prevState,
                right: newRight,
                left: newLeft
            }))
        }
    }

    const updateBounds = (scale: number) =>
        currRotate % 180 === 0 ? countNewBounds(scale) : countNewBounds(scale, true)

    // Хук для перемещения изображения
    const {x, y, bindDrag, apiDrag} =
        useMyDrag({bounds})

    // Хук для изменения размеров изображения
    const {scale, apiWheel, bindWheel, lastScale, setLastScale} =
        useMyWheel({
            maxSizeScaleImg,
            minSizeScaleImg,
            scaleFactor,
            setIsImmediateDrag,
            imgBlockRef,
            apiDrag,
            updateBounds})

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

            // Вычисление scale для конкретного изображения
            const baseSize = Math.max(myParSizes.width, myParSizes.height);
            const normalizedScaleFactor = Math.sqrt((width * height) / baseSize);
            setScaleFactor(speedZoom / normalizedScaleFactor);

            if (width > height) {
                const newScale = myParSizes.width / width
                apiWheel.start({
                    scale: newScale, onResolve: () => {
                        updateBounds(newScale)
                    },
                    immediate: true
                })
                setMinSizeScaleImg(myParSizes.width / width)
            }
            else {
                const newScale = myParSizes.height / height
                apiWheel.start({
                    scale: newScale, onResolve: () => {
                        updateBounds(newScale)
                    },
                    immediate: true
                })
                setMinSizeScaleImg(myParSizes.height / height)
            }
        }
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

    // Обработка для выделения облоасти изображения
    useEffect(() => {
        if (!isEdit) {
            setImgRect(origImgSizes)
            setIsEmptyImgRect(true)
        }
    }, [isEdit]);

    useEffect(() => {
        if (isEmptyImgRect && isEdit || isStartDrawRect) {
            setIsHiddenBottomPanel(true)
        } else {
            setIsHiddenBottomPanel(false)
        }
    }, [isEdit, isEmptyImgRect, isStartDrawRect]);

    useEffect(() => {
        if (isEdit && !isStartDrawRect) {
            const sizeMyParent = parentRef.current!.getBoundingClientRect()
            if (imgRect.width > imgRect.height) {
                apiWheel({scale: sizeMyParent.width/imgRect.width, onChange: (result) => {
                        updateBounds(result.value.scale)
                    }})
            } else {
                apiWheel({scale: sizeMyParent.height/imgRect.height, onChange: (result) => {
                        updateBounds(result.value.scale)
                    }})
            }
        }
    }, [isStartDrawRect]);

    useEffect(() => {
        if (isEdit || isRec || isSquare) {
            const sizeMyParent = parentRef.current!.getBoundingClientRect()
            const imgRectX = imgRect.x1*scale.get()
            const imgRectY = imgRect.y1*scale.get()
            const imgRectW = imgRect.width*scale.get()
            const imgRectH = imgRect.height*scale.get()
            const leftX = bounds.right-imgRectX
            const leftY = bounds.bottom-imgRectY
            let deltaX = (sizeMyParent.width - imgRectW)/2+leftX
            let deltaY = (sizeMyParent.height - imgRectH)/2+leftY
            deltaX = Math.max(bounds.left, Math.min(bounds.right, deltaX))
            deltaY = Math.max(bounds.top, Math.min(bounds.bottom, deltaY))
            apiDrag.start({x: deltaX, y: deltaY})
        }
    }, [bounds, isRec, isSquare]);

    // При повороте изображения пересчитываем границы для блока с движением изображения
    useEffect(() => {
        updateBounds(scale.get())
    }, [currRotate]);

    // Движение изображения к границам, когда оно от него сильно отходит
    useEffect(() => {
        const {left, top, bottom, right} = bounds

        x.get() > right && apiDrag.start({x: right, immediate: isImmediateDrag})
        x.get() < left && apiDrag.start({x: left, immediate: isImmediateDrag})

        y.get() > bottom && apiDrag.start({y: bottom, immediate: isImmediateDrag})
        y.get() < top && apiDrag.start({y: top, immediate: isImmediateDrag})
    }, [bounds]);

    // Сброс всех инструментов
    useEffect(() => {
        setIsEdit(false)
        setImgRect({x1: 0, width: 0, height: 0, y1: 0})
        setStartCord({x: 0, y: 0})
    }, [resetTools])

    return (
        <div className="flex-1 flex overflow-hidden cursor-grab">
            {isDark && <Masks myBoxes={myBoxes} imgRect={imgRect}/>}
            <div className="flex-1 overflow-hidden relative"
                 ref={parentRef}
            >
                {isLoading &&
                    <LoadingDotRight/>}
                <div>
                    <animated.div className={`relative`}
                                  ref={imgBlockRef}
                                  {...(!isEdit && !isRec && !isSquare && bindDrag())}
                                  {...bindWheel()}
                                  style={{
                                      x, y,
                                      transform: scale.to(s => `scale(${s})`),
                                      transformOrigin: 'top left',
                                      touchAction: 'none'
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
                        {!isEdit && !isRec && !isSquare &&
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
                            <div
                                className={`bg-black/[0.5] absolute w-full h-full left-0 top-0 z-10 
                                ${isEdit || isRec || isSquare ? 'cursor-copy' : 'cursor-grab'}`}
                                style={{
                                    transform: `rotate(${currRotate}deg)`,
                                    transformOrigin: 'center'
                                }}
                                onMouseDown={handleDownRect}
                                onMouseUp={handleUpRect}
                                onMouseMove={handleMoveRect}
                                onMouseLeave={handleLeaveMouse}
                            >
                                {(isEdit || isRec || isSquare) && !isEmptyImgRect && <ImgRectBlock imgRect={imgRect}/>}
                                <img src={srcImg}
                                     className="h-full max-h-none max-w-none z-20"
                                     style={{
                                         clipPath: `${isEdit || isRec || isSquare ? 'url(#cropMask)' : 'url(#contentMask)'}`,
                                     }}
                                     alt="MyImg"/>
                            </div>
                        </>}
                    </animated.div>
                </div>
                {!isHiddenBottomPanel &&
                    <div className="py-[10px] px-[20px] bottom-[20px] left-1/2 -translate-x-1/2 w-auto
                    bg-gray-900/[0.7] rounded-xl z-50 absolute h-[50px] flex justify-center gap-x-[10px] cursor-pointer
                    after:relative after:-ml-[10px]">
                        <RotateBlock setCurrRotate={setCurrRotate}
                        />
                        <ZoomBlock apiWheel={apiWheel}
                                   maxSizeScaleImg={maxSizeScaleImg}
                                   minSizeScaleImg={minSizeScaleImg}
                                   scaleFactor={scaleFactor}
                                   updateBounds={updateBounds}
                        />
                        <FigureBlock setCurrCrop={setCurrCrop}
                                     setImgRect={setImgRect}
                                     origImgSizes={origImgSizes}
                                     setIsEmptyImgRect={setIsEmptyImgRect}
                                     setIsSquare={setIsSquare}
                                     setIsRec={setIsRec}
                                     apiWheel={apiWheel}
                                     updateBounds={updateBounds}
                                     imgBlockRef={imgBlockRef}
                                     parentRef={parentRef}
                        />
                        <CutBlock setImgRect={setImgRect}
                                  setIsEmptyImgRect={setIsEmptyImgRect}
                                  isEdit={isEdit}
                                  setIsEdit={setIsEdit}
                        />
                        <RefreshBlock models={models}
                                      handleChoseOption={handleChoseOption}
                                      setIsEdit={setIsEdit}
                        />
                    </div>
                }
            </div>
        </div>
    );
};