import React, {useEffect, useRef, useState} from 'react';
import {TBbox} from "../../../05_entities/RenameFileFetchData";
import {useSpring, animated} from "react-spring";
import {useDrag, useWheel} from "@use-gesture/react";

type ImageWrapperProps = {
    myBoxes: TBbox[];
    handleClickBox: (e: React.MouseEvent<HTMLDivElement>, word: string) => void;
    srcImg: string
    isDark?: boolean
}

export const ImageWrapper:
    React.FC<ImageWrapperProps> = ({isDark,
                                       srcImg,
                                       myBoxes,
                                       handleClickBox}) => {

    const [lastScale, setLastScale] = useState<number>(0)
    const [bounds, setBounds] =
        useState<{left: number, right: number, top: number, bottom: number}>(
            { left: 0, right: 0, top: 0, bottom: 0 }
        )

    const origImgRef = useRef<HTMLImageElement>(null)
    const imgBlockRef = useRef<HTMLImageElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)

    const countNewBounds = () => {
        const sizeMyImg = imgBlockRef.current!.getBoundingClientRect()
        const sizeMyParent = parentRef.current!.getBoundingClientRect()
        const origWidth = sizeMyImg.width / scale.get();
        const origHeight = sizeMyImg.height / scale.get();

        let newRight = -(origWidth - sizeMyImg.width)/2;
        let newBottom = -(origHeight - sizeMyImg.height)/2
        let newLeft = -(sizeMyImg.width-sizeMyParent.width)+newRight
        let newTop = -(sizeMyImg.height-sizeMyParent.height)+newBottom

        const tempBottom = newBottom;
        newBottom = newBottom < newTop ? 0 : newBottom
        newTop = newTop > tempBottom ? 0 : newTop

        const tempRight = newRight;
        newRight = newRight < newLeft ? 0 : newRight
        newLeft = newLeft > newRight ? 0 : newLeft

        setBounds(prevState =>
            ({
                bottom: newBottom,
                right: newRight,
                left: newLeft,
                top: newTop
            })
        )
    }

    const [{ x, y}, apiDrag] =
        useSpring(() => ({x: 0, y: 0}))

    const bindDrag = useDrag(({ down, offset: [ox, oy] }) =>
        apiDrag.start({x: ox, y: oy, immediate: down}), {
        bounds,
        eventOptions: {capture: true},
        rubberband: true
    })

    const [{scale}, apiWheel] =
        useSpring(() => ({scale: 1}))

    const bindWheel = useWheel(({offset: [dx, dy]}) => {
        const scaleFactor = 0.001;
        const newScale = scale.get() - (dy-lastScale) * scaleFactor;
        setLastScale(dy);
        const clampedScale = Math.max(0.5, Math.min(newScale, 3));
        apiWheel.start({scale: clampedScale})

        countNewBounds()
    }, {})

    const handleImageLoad = () => {
        if (origImgRef.current) {
            const width = origImgRef.current.naturalWidth;
            const height = origImgRef.current.naturalHeight;

            imgBlockRef.current!.style.width = `${width}px`;
            imgBlockRef.current!.style.height = `${height}px`;
        }
        countNewBounds()
    }

    useEffect(() => {
        console.log(myBoxes)
    }, [myBoxes]);

    return (
        <div className="w-1/3 h-full flex">
            {isDark && <svg xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            style={{ position: 'absolute' }}>
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
            <div className="flex-1 border-solid overflow-hidden"
                 ref={parentRef}
            >
                <div>
                    <animated.div className="relative"
                                  ref={imgBlockRef}
                                  {...bindDrag()}
                                  {...bindWheel()}
                                  style={{
                                      x, y,
                                      transform: scale.to(s => `scale(${s})`),
                                  }}
                                  onDragStart={(e) => e.preventDefault()}
                    >
                        {myBoxes.map((box, id) => (
                            <div className={`absolute ring-1 ring-mainGreen rounded-[5px] z-30`}
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
                        <img src={srcImg}
                             ref={origImgRef}
                             onLoad={handleImageLoad}
                             className="h-full max-h-none max-w-none absolute z-0"
                             alt="MyImg"/>
                        {isDark && <>
                            <div className="bg-black/[0.5] absolute w-full h-full left-0 top-0 z-10"/>
                            <img src={srcImg}
                                 className="h-full max-h-none max-w-none absolute z-20"
                                 style={{
                                     clipPath: `url(#myMask)`
                                 }}
                                 alt="MyImg"/>
                        </>}
                    </animated.div>
                </div>
            </div>
        </div>
    );
};