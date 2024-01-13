import React, {useState} from "react";
import {SpringRef, useSpring} from "react-spring";
import {useWheel} from "@use-gesture/react";
import {useCountBounds} from "./useCountBounds";
import {countNewBoundsProps} from "../model/countBoundsTypes";
import {useImgStore} from "./useImgStore";

type useMyWheelProps = {
    minSizeScaleImg: number,
    maxSizeScaleImg: number,
    scaleFactor: number,
    setIsImmediateDrag: React.Dispatch<React.SetStateAction<boolean>>,
    imgBlockRef: React.RefObject<HTMLDivElement>,
    apiDrag: SpringRef<{x: number, y: number}>,

    updateBounds: (scale: number) => void
}

export const useMyWheel =
    ({
         minSizeScaleImg,
         maxSizeScaleImg,
         scaleFactor,
         setIsImmediateDrag,
         imgBlockRef,
         apiDrag,
         updateBounds,
     }: useMyWheelProps) => {
        const [lastScale, setLastScale] =
            useState<number>(0)

        const [{scale}, apiWheel] =
            useSpring(() => ({scale: 1}))

        const bindWheel = useWheel(
            ({event, delta: [dx, dy]}) => {
                event.preventDefault()
                if (dy !== 0) {
                    setIsImmediateDrag(false)
                    const {top, left} = imgBlockRef.current!.getBoundingClientRect()

                    const newScale = scale.get() - dy * scaleFactor;

                    const clampedScale = Math.max(minSizeScaleImg, Math.min(newScale, maxSizeScaleImg));

                    let lastDeltaX = 0
                    let lastDeltaY = 0

                    const ormOriginX = (event.clientX - left) / scale.get()
                    const ormOriginY = (event.clientY - top) / scale.get()

                    apiWheel.start({
                        scale: clampedScale,
                        onChange: (result) => {
                            if (ormOriginX !== 0) {
                                const modifyOriginX = (event.clientX - left) / result.value.scale
                                const deltaX = (ormOriginX - modifyOriginX)*result.value.scale

                                const offsetX = deltaX - lastDeltaX
                                const newX = apiDrag.current[0].get().x - offsetX
                                apiDrag.start({x: newX, immediate: true})

                                lastDeltaX = deltaX;
                            }

                            if (ormOriginY !== 0) {
                                const modifyOriginY = (event.clientY - top) / result.value.scale
                                const deltaY = (ormOriginY - modifyOriginY)*result.value.scale

                                const offsetY = deltaY - lastDeltaY
                                const newY = apiDrag.current[0].get().y - offsetY
                                apiDrag.start({y: newY, immediate: true})

                                lastDeltaY = deltaY
                            }

                            updateBounds(result.value.scale)
                        },
                    });
                }
            }, {});



        return {lastScale, setLastScale, scale, apiWheel, bindWheel}
    }