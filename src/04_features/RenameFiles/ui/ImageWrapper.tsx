import React, {useEffect, useRef, useState} from 'react';
import {animated} from "react-spring";
import {TOption} from "../../../06_shared/model/typeSelect";
import {LoadingDotRight} from "../../../06_shared/ui/loading";
import {TBbox, TImgSizes} from "../../../05_entities/FetchPipeline";
import {
    BottomPanelImgWrap, CutBlock,
    ImgRectBlock,
    Masks, RefreshBlock, RotateBlock,
    TCord,
    useCountBounds, useImgStore,
    useMyDrag,
    useMyWheel, ZoomBlock
} from "../../../05_entities/ImageWrapper";
import {TBounds} from "../../../05_entities/ImageWrapper/model/dragTypes";

const maxSizeScaleImg = 200

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
                                       imgRect, setImgRect, resetTools
                                   }) => {

    const [minSizeScaleImg, setMinSizeScaleImg] =
        useState<number>(0.1)
    const [bounds, setBounds] =
        useState<TBounds>({left: 0, right: 0, top: 0, bottom: 0})
    const [isHiddenBottomPanel, setIsHiddenBottomPanel] =
        useState<boolean>(false)
    const [isRec, setIsRec] =
        useState<boolean>(false)
    const [isSquare, setIsSquare] =
        useState<boolean>(false)

    // Размеры оригинального изображения
    const origImgRef = useRef<HTMLImageElement>(null)
    // Блок с изображение уже отформатированный с учётом зума
    const imgBlockRef = useRef<HTMLImageElement>(null)
    // Размеры окна, в котором изменяется изображение
    const parentRef = useRef<HTMLDivElement>(null)

    // Рассчёт границ для изображения (условно, если изображение не вписывается в parentRef, то мы центрируем его parentRef)
    const countNewBounds = (isRotate = false) => {
        let {width: sizeMyImgW, height: sizeMyImgH} = imgBlockRef.current!.getBoundingClientRect()
        const sizeMyParent = parentRef.current!.getBoundingClientRect()
        let origWidthImg = sizeMyImgW / scale.get();
        let origHeightImg = sizeMyImgH / scale.get();

        if (isRotate)
            sizeMyImgW = [sizeMyImgH, sizeMyImgH = sizeMyImgW][0]

        let newRight = -(origWidthImg - sizeMyImgW) / 2; // oW - sW || oW - sH
        let newBottom = -(origHeightImg - sizeMyImgH) / 2 // oH - sH || oH - sW
        let newLeft = -(sizeMyImgW - sizeMyParent.width) + newRight // sW - pW || sH - pW
        let newTop = -(sizeMyImgH - sizeMyParent.height) + newBottom // sH - pH || sW - pH

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

    const updateBounds = () =>
        currRotate % 180 === 0 ? countNewBounds() : countNewBounds(true)

    // Хук для перемещения изображения
    const {x, y, bindDrag, apiDrag} =
        useMyDrag({bounds})

    // Хук для изменения размеров изображения
    const {scale, apiWheel, bindWheel, lastScale, setLastScale} =
        useMyWheel({maxSizeScaleImg, minSizeScaleImg, updateBounds})

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

            if (width > height) {
                const newScale = myParSizes.width / width
                apiWheel.start({
                    scale: newScale, onResolve: () => {
                        updateBounds()
                    }
                })
                setMinSizeScaleImg(myParSizes.width / width)
            }
            else {
                const newScale = myParSizes.height / height
                apiWheel.start({
                    scale: newScale, onResolve: () => {
                        updateBounds()
                    }
                })
                setMinSizeScaleImg(myParSizes.height / height)
            }
        }
    }

    const handleActiveFigure = (isRec: boolean, isSquare: boolean) => {
        setIsRec(isRec)
        setIsSquare(isSquare)
        const sizeMyParent = parentRef.current!.getBoundingClientRect()
        const sizeMyImg = imgBlockRef.current!.getBoundingClientRect()
        const origWidthImg = sizeMyImg.width / scale.get();
        const origHeightImg = sizeMyImg.height / scale.get();
        if (isRec) {
            if (origWidthImg > origHeightImg) {
                const width = (3/2)*origHeightImg
                setImgRect({x1: 0, y1: 0, height: origHeightImg, width})
                setIsEmptyImgRect(false)
                apiWheel({scale: sizeMyParent.height/width, onChange: () => {
                        updateBounds()
                    }
                })
            } else {
                setImgRect({x1: 0, y1: 0, height: (2/3)*origWidthImg, width: origWidthImg})
                setIsEmptyImgRect(false)
                apiWheel({scale: sizeMyParent.width/origWidthImg, onChange: () => {
                        updateBounds()
                    }
                })
            }
        }

        if (isSquare) {
            if (origWidthImg > origHeightImg) {
                setImgRect({x1: 0, y1: 0, height: origHeightImg, width: origHeightImg})
                setIsEmptyImgRect(false)
                apiWheel({scale: sizeMyParent.height/origHeightImg, onChange: () => {
                        updateBounds()
                    }
                })
            } else {
                setImgRect({x1: 0, y1: 0, height: origWidthImg, width: origWidthImg})
                setIsEmptyImgRect(false)
                apiWheel({scale: sizeMyParent.width/origWidthImg, onChange: () => {
                        updateBounds()
                    }
                })
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
                apiWheel({scale: sizeMyParent.width/imgRect.width, onChange: () => {
                        updateBounds()
                    }})
            } else {
                apiWheel({scale: sizeMyParent.height/imgRect.height, onChange: () => {
                        updateBounds()
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
                                      // transformOrigin: `central`
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
                    // <div className="py-[10px] px-[20px] bottom-[20px] left-1/2 -translate-x-1/2 w-auto
                    // bg-gray-900/[0.7] rounded-xl z-50 absolute h-[50px] flex justify-center gap-x-[10px] cursor-pointer
                    // after:relative after:-ml-[10px]">
                    //     <RotateBlock/>
                    //     <ZoomBlock/>
                    //     <CutBlock/>
                    //     <RefreshBlock/>
                    // </div>
                    <BottomPanelImgWrap
                        isCut isRefresh isRotate isZoom
                        handleActiveFigure={handleActiveFigure}
                        isEdit={isEdit}
                        scale={scale}
                        setLastScale={setLastScale}
                        apiWheel={apiWheel}
                        updateBounds={updateBounds}
                        setCurrRotate={setCurrRotate}
                        maxSizeScaleImg={maxSizeScaleImg}
                        minSizeScaleImg={minSizeScaleImg}
                        handleChoseOption={handleChoseOption}
                        models={models}
                        setCurrCrop={setCurrCrop}
                        setImgRect={setImgRect}
                        setIsEmptyImgRect={setIsEmptyImgRect}
                        setIsEdit={setIsEdit}
                        origImgSizes={origImgSizes}
                        resetTools={resetTools}
                    />
                }
            </div>
        </div>
    );
};