import {TCord} from "../model/imgTypes";
import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {TBounds} from "../model/dragTypes";

type States = {
    cord: TCord
    scale: number
    bounds: TBounds
    lastScale: number
    currRotate: number
}

type Actions = {
    setCord: (x: number, y: number) => void
    setScale: (scale: number) => void
    setBounds: (bounds: TBounds) => void
    setLastScale: (lastScale: number) => void
    setCurrRotate: (currRotate: number) => void
}

export const useImgStore = create<States & Actions>()(
    devtools(
        persist(
            (set) => ({
                cord: {x: 0, y: 0},
                scale: 1,
                bounds: {left: 0, bottom: 0, top: 0, right: 0},
                lastScale: 0,
                currRotate: 0,
                setCord: (x, y) => set(() => ({
                    cord: {x, y}
                })),
                setScale: (scale) => set(() => ({
                    scale
                })),
                setBounds: (bounds) => set(() => ({
                    bounds
                })),
                setLastScale: (lastScale) => set(() => ({
                    lastScale
                })),
                setCurrRotate: (currRotate) => set(() => ({
                    currRotate
                }))
            }), {name: 'useImgStore'}
        )
    )
)