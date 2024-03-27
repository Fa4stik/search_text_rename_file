import {useSpring} from "react-spring";
import {useDrag} from "@use-gesture/react";
import {TBounds} from "../model/dragTypes";

type useMyDragProps = {
    bounds: TBounds
}

export const useMyDrag = ({
    bounds
}: useMyDragProps) => {
    const [{x, y}, apiDrag] =
        useSpring(() => (
            {x: 0, y: 0}))

    const bindDrag = useDrag(({
        down,
        offset: [ox, oy]
    }) => {
        apiDrag.start({x: ox, y: oy, immediate: down})
    }, {
        bounds, eventOptions: {capture: true},
        rubberband: true, from: () => [x.get(), y.get()]
    })

    return {x, y, bindDrag, apiDrag}
}