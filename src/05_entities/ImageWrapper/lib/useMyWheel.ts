import React, {useState} from "react";
import {SpringRef, useSpring} from "react-spring";
import {useWheel} from "@use-gesture/react";

type useMyWheelProps = {
    minSizeScaleImg: number,
    maxSizeScaleImg: number,
    scaleFactor: number,
    setIsImmediateDrag: React.Dispatch<React.SetStateAction<boolean>>,
    imgBlockRef: React.RefObject<HTMLDivElement>,
    apiDrag: SpringRef<{ x: number, y: number }>,
    updateBounds: (scale: number) => void
}

export const useMyWheel = ({
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

    console.log(imgBlockRef.current!.style)

    const bindWheel = useWheel(
        ({event, delta: [dx, dy]}) => {
            event.preventDefault()
            if (dy !== 0) {
                setIsImmediateDrag(false)
                const {top, left, width, height} = imgBlockRef.current!.getBoundingClientRect()

                const newScale = scale.get() - dy * scaleFactor;

                const clampedScale = Math.max(minSizeScaleImg, Math.min(newScale, maxSizeScaleImg));

                let lastDeltaX = 0
                let lastDeltaY = 0

                const startOriginX = width / 2
                const startOriginY = height / 2

                const ormOriginX = (event.clientX - left - startOriginX) / scale.get()
                const ormOriginY = (event.clientY - top - startOriginY) / scale.get()

                apiWheel.start({
                    scale: clampedScale,
                    onChange: (result) => {
                        if (ormOriginX !== 0) {
                            const modifyOriginX = (event.clientX - left - startOriginX) / result.value.scale
                            const deltaX = (ormOriginX - modifyOriginX) * result.value.scale

                            const offsetX = deltaX - lastDeltaX
                            const newX = apiDrag.current[0].get().x - offsetX
                            apiDrag.start({x: newX, immediate: true})

                            lastDeltaX = deltaX;
                        }

                        if (ormOriginY !== 0) {
                            const modifyOriginY = (event.clientY - top - startOriginY) / result.value.scale
                            const deltaY = (ormOriginY - modifyOriginY) * result.value.scale

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