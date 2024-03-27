import React, {useEffect, useRef, useState} from 'react';
import {animated} from "react-spring";
import {TOption} from "../../../06_shared/model/typeSelect";
import {LoadingDotRight} from "../../../06_shared/ui/loading";
import {TBbox, TImgSizes} from "../../../05_entities/FetchPipeline";
import {
    CutBlock,
    FigureBlock,
    ImgRectBlock,
    Masks,
    RefreshBlock,
    RotateBlock,
    TCord,
    useMyDrag,
    useMyWheel,
    ZoomBlock
} from "../../../05_entities/ImageWrapper";
import {TBounds} from "../../../05_entities/ImageWrapper/model/dragTypes";
import {useGesture, useMove, Vector2} from "@use-gesture/react";

const maxSizeScaleImg = 200
const speedZoom = 0.05

type ImageWrapperProps = {
    myBoxes: TBbox[]
    handleClickBox: (e: React.MouseEvent<HTMLDivElement>, word: string) => void
    srcImg: string
    isRotate?: boolean
    isZoom?: boolean
    isRefresh?: boolean
    isCut?: boolean
    isLoading?: boolean
    handleChoseOption?: (e: React.MouseEvent<HTMLSpanElement>, value: string | number) => void
    models: TOption[],
    currRotate: number,
    setCurrRotate: React.Dispatch<React.SetStateAction<number>>
    imgRect: TImgSizes
    setImgRect: React.Dispatch<React.SetStateAction<TImgSizes>>
    resetTools: boolean
    isLoadingImg: boolean
    setIsLoadingImg: React.Dispatch<React.SetStateAction<boolean>>
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({
    srcImg,
    myBoxes,
    handleClickBox,
    isZoom,
    isRefresh,
    isRotate,
    handleChoseOption,
    models,
    setCurrRotate,
    currRotate,
    isCut,
    isLoading,
    imgRect,
    setImgRect,
    resetTools,
    isLoadingImg,
    setIsLoadingImg
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
    const [isRecRotate, setIsRecRotate] =
        useState<boolean>(false)
    const [isSquare, setIsSquare] =
        useState<boolean>(false)
    const [heightTool, setHeightTool] =
        useState<number>(0)
    const [isDark, setIsDark] =
        useState<boolean>(myBoxes.length > 0)

    // Размеры оригинального изображения
    const origImgRef = useRef<HTMLImageElement>(null)
    // Блок с изображение уже отформатированный с учётом зума
    const imgBlockRef = useRef<HTMLDivElement>(null)
    // Размеры окна, в котором изменяется изображение
    const parentRef = useRef<HTMLDivElement>(null)
    // Размеры изображения без учёта поворота
    const origOffsetRef = useRef<HTMLDivElement>(null)

    // Рассчёт границ для изображения (условно, если изображение не вписывается в parentRef, то мы центрируем его parentRef)
    const countNewBounds = (scale: number, isRotate = false) => {
        const parSizes = parentRef.current!.getBoundingClientRect();
        let origImgW = origImgRef.current!.naturalWidth
        let origImgH = origImgRef.current!.naturalHeight
        let imgSizesW = origImgW*scale
        let imgSizesH = origImgH*scale

        const myOriginX = origImgW/2
        const myOriginY = origImgH/2

        // Разница при повороте
        let startX = myOriginX*(scale-1)
        let startY = myOriginY*(scale-1)

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

    const rotatePoint = (x: number, y: number, centerx: number, centery: number, degrees: number) => {
        const theta = degrees * Math.PI / 180
        const newx = (x - centerx) * Math.cos(theta) +
            (y - centery) * Math.sin(theta) + centerx;
        const newy = -(x - centerx) * Math.sin(theta) +
            (y - centery) * Math.cos(theta) + centery;
        return [newx, newy];
    }

    const rotRect = (x: number, y: number) => {
        let theta = currRotate * Math.PI / 180;
        return {
            x: x * Math.cos(theta) - y * Math.sin(theta),
            y: x * Math.sin(theta) + y * Math.cos(theta)
        }
    }

    const calculateBounds = (x1: number, y1: number, x2: number, y2: number) => {
        let [p1, p2, p3, p4] = [
            rotRect(x1, y1),
            rotRect(x2, y1),
            rotRect(x1, y2),
            rotRect(x2, y2)
        ];

        let width = Math.max(p1.x, p2.x, p3.x, p4.x) - Math.min(p1.x, p2.x, p3.x, p4.x);
        let height = Math.max(p1.y, p2.y, p3.y, p4.y) - Math.min(p1.y, p2.y, p3.y, p4.y);

        return [width, height];
    };

    const getCord = (event: PointerEvent): Vector2 => {
        const {left, top, width, height} = origOffsetRef.current!.getBoundingClientRect()
        const [rawX, rawY] =
            [(event.clientX - left)/scale.get(), (event.clientY - top)/scale.get()]

        const [relativeX, relativeY] =
            rotatePoint(rawX, rawY,
                width/2/scale.get(), height/2/scale.get(),
                currRotate)

        return [relativeX, relativeY]
    }

    const stopMouseCrop = () => {
        setIsStartDrawRect(false)
        const {width: parWidth, height: parHeight} = parentRef.current!.getBoundingClientRect()
        const {x1, y1, width, height} = imgRect
        const [imgRectW, imgRectH] = calculateBounds(x1, y1, x1+width, y1+height)

        if (imgRectW > imgRectH) {
            let promiseScale = (parWidth - 20)/imgRectW
            const imgRectHeightOrig = (parHeight - (imgRectH*promiseScale))/2
            promiseScale = imgRectHeightOrig > heightTool
                ? promiseScale
                : (parWidth - heightTool*2)/imgRectW

            apiWheel({scale: promiseScale,
                onChange: (result) => {
                    updateBounds(result.value.scale)
                }})
        }

        if (imgRectW < imgRectH) {
            let promiseScale = (parHeight - 20)/imgRectH
            const imgRectHeightOrig = (parHeight - (imgRectH*promiseScale))/2
            promiseScale = imgRectHeightOrig > heightTool
                ? promiseScale
                : (parHeight - heightTool*2)/imgRectH

            apiWheel({scale: promiseScale,
                onChange: (result) => {
                    updateBounds(result.value.scale)
                }})
        }
    }

    const updateBounds = (scale: number) =>
        currRotate % 180 === 0 ? countNewBounds(scale) : countNewBounds(scale, true)

    // Хук для перемещения изображения
    const {x, y, bindDrag, apiDrag} =
        useMyDrag({bounds})

    // Хук для изменения размеров изображения
    const {scale, apiWheel, bindWheel,
        lastScale, setLastScale} =
        useMyWheel({
            maxSizeScaleImg,
            minSizeScaleImg,
            scaleFactor,
            setIsImmediateDrag,
            imgBlockRef,
            apiDrag,
            updateBounds})

    // При загрузке изображения вписываем его либо по ширине, либо по высооте
    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        setIsLoadingImg(false)
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
                setMinSizeScaleImg(myParSizes.width/2 / width)
            }

            if (width <= height) {
                const newScale = myParSizes.height / height
                apiWheel.start({
                    scale: newScale, onResolve: () => {
                        updateBounds(newScale)
                    },
                    immediate: true
                })
                setMinSizeScaleImg(myParSizes.height/2 / height)
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

    // Обработка при начале выделения области
    // Обработка движения выделения
    const bindMoveMouse = useMove(({event}) => {
        if (isStartDrawRect) {
            const [x2, y2] = getCord(event)
            const {x: x1, y: y1} = startCord

            const [minX, minY] = [Math.min(x1, x2), Math.min(y1, y2)];
            const [maxX, maxY] = [Math.max(x1, x2), Math.max(y1, y2)];

            setImgRect({ x1: minX, y1: minY, width: maxX - minX, height: maxY - minY });
        }
    }, {})

    const bindGestures = useGesture({
        onMouseDown: ({event}) => {
            const [x, y] = getCord(event as PointerEvent)
            setStartCord({x, y})
            setIsStartDrawRect(true)
            setIsEmptyImgRect(false)
        },
        onMouseLeave: () => {
            stopMouseCrop()
        },
        onMouseUp: () => {
            stopMouseCrop()
        }
    }, {enabled: isEdit})

    // Если боксов нет, то оставляем изображение без затемнения
    useEffect(() => {
        myBoxes.length !== 0 &&
            setIsDark(true)

        myBoxes.length === 0 &&
            setIsDark(false)
    }, [myBoxes, isLoadingImg]);

    // Обработка для выделения области изображения
    useEffect(() => {
        if (!isEdit) {
            setImgRect(origImgSizes)
            setIsEmptyImgRect(true)
        }

        isEdit && (myBoxes.length === 0) &&
            setIsDark(true)
    }, [isEdit]);

    useEffect(() => {
        if (isEmptyImgRect && isEdit || isStartDrawRect) {
            setIsHiddenBottomPanel(true)
        } else {
            setIsHiddenBottomPanel(false)
        }
    }, [isEdit, isEmptyImgRect, isStartDrawRect]);

    // При повороте изображения пересчитываем границы для блока с движением изображения
    useEffect(() => {
        updateBounds(scale.get())
    }, [currRotate]);

    // Движение изображения к границам, когда оно от него сильно отходит
    useEffect(() => {
        const {left, top, bottom, right} = bounds

        if (isEdit || isRec || isRecRotate || isSquare) {
            const sizeMyParent = parentRef.current!.getBoundingClientRect()
            let {x1, y1, width: imgRectW, height: imgRectH} = imgRect
            let [imgRectWR, imgRectHR] = calculateBounds(x1, y1, x1+imgRectW, y1+imgRectH)
            const {width, height} = imgBlockRef.current!.getBoundingClientRect()
            let [x2, y2] = [x1 + imgRectW, y1 + imgRectH]

            if (currRotate === 0) {
                x1 *= scale.get()
                y1 *= scale.get()
            }

            if (currRotate === 270) {
                x1 = y1 * scale.get()
                y1 = height -  x2 * scale.get()
            }

            if (currRotate === 180) {
                x1 = width - x2 * scale.get()
                y1 = height - y2 * scale.get()
            }

            if (currRotate === 90) {
                y1 = x1 * scale.get()
                x1 = width - y2 * scale.get()
            }

            let leftX = bounds.right-x1
            let leftY = bounds.bottom-y1

            let deltaX = (sizeMyParent.width - imgRectWR * scale.get())/2+leftX
            let deltaY = (sizeMyParent.height  - imgRectHR * scale.get())/2+leftY

            deltaX = Math.max(bounds.left, Math.min(bounds.right, deltaX))
            deltaY = Math.max(bounds.top, Math.min(bounds.bottom, deltaY))

            apiDrag.start({x: deltaX, y: deltaY})
        }

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
                                  {...(!isEdit && !isRec && !isRecRotate && !isSquare && bindDrag())}
                                  {...bindWheel()}
                                  style={{
                                      x, y,
                                      transform: scale.to(s => `scale(${s})`),
                                      rotate: `${currRotate}deg`,
                                      transformOrigin: 'center center',
                                      touchAction: 'none'
                                  }}
                                  onDragStart={(e) => e.preventDefault()}
                    >
                        {isEdit &&
                            <div className="absolute w-full h-full top-0 left-0 z-[100] cursor-copy"
                                 {...bindMoveMouse()}
                                 {...bindGestures()}
                            />}
                        <div className="absolute top-0 left-0 w-full h-full" style={{
                            rotate: `${360 - currRotate}deg`
                        }}
                             ref={origOffsetRef}
                        />
                        <img src={srcImg}
                             ref={origImgRef}
                             onLoad={handleImageLoad}
                             className="h-full max-h-none max-w-none absolute z-0"
                             alt="MyImg"/>
                        {!isEdit && !isRec && !isRecRotate && !isSquare &&
                            <div className="absolute z-30 w-full h-full"
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
                                ${isEdit || isRec || isRecRotate || isSquare ? 'cursor-copy' : 'cursor-grab'}`}
                            >
                                {(isEdit || isRec || isRecRotate || isSquare) && !isEmptyImgRect &&
                                    <ImgRectBlock imgRect={imgRect}/>}
                                <img src={srcImg}
                                     className="h-full max-h-none max-w-none z-20"
                                     style={{
                                         clipPath: `${isEdit || isRec || isRecRotate || isSquare ? 'url(#cropMask)' : 'url(#contentMask)'}`,
                                     }}
                                     alt="MyImg"/>
                            </div>
                        </>}
                    </animated.div>
                </div>
                {!isHiddenBottomPanel &&
                    <div className="py-[10px] px-[20px] bottom-[20px] left-1/2 -translate-x-1/2 min-w-max
                    bg-gray-900/[0.7] rounded-xl z-50 absolute h-[50px] flex justify-center gap-x-[10px] cursor-pointer
                    after:relative after:-ml-[10px]"
                         onLoad={(e) => {
                             setHeightTool(e.currentTarget.getBoundingClientRect().height + 10)
                         }}
                    >
                        <RotateBlock setCurrRotate={setCurrRotate}
                        />
                        <ZoomBlock apiWheel={apiWheel}
                                   maxSizeScaleImg={maxSizeScaleImg}
                                   minSizeScaleImg={minSizeScaleImg}
                                   scaleFactor={scaleFactor}
                                   updateBounds={updateBounds}
                        />
                        <FigureBlock setImgRect={setImgRect}
                                     setIsEmptyImgRect={setIsEmptyImgRect}
                                     setIsSquare={setIsSquare}
                                     setIsRec={setIsRec}
                                     setIsRecRotate={setIsRecRotate}
                                     apiWheel={apiWheel}
                                     updateBounds={updateBounds}
                                     imgBlockRef={imgBlockRef}
                                     parentRef={parentRef}
                                     resetTools={resetTools}
                                     rotate={currRotate}
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