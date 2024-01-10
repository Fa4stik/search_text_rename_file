import {useState} from "react";
import {useSpring} from "react-spring";
import {useWheel} from "@use-gesture/react";
import {useCountBounds} from "./useCountBounds";
import {countNewBoundsProps} from "../model/countBoundsTypes";
import {useImgStore} from "./useImgStore";

type useMyWheelProps = {
    minSizeScaleImg: number,
    maxSizeScaleImg: number,
    updateBounds: () => void
}

export const useMyWheel =
    ({
         minSizeScaleImg,
         maxSizeScaleImg,
         updateBounds
     }: useMyWheelProps) => {

        // const {scale: startScale,
        //     lastScale, setLastScale,
        //     setScale} = useImgStore()

        const [lastScale, setLastScale] =
            useState<number>(0)

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



        return {lastScale, setLastScale, scale, apiWheel, bindWheel}
    }