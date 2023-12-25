import React from "react";
import {TBounds} from "../model/dragTypes";
import {SpringRef} from "react-spring";
import {useImgStore} from "./useImgStore";

type useCountBoundsProps = Pick<countNewBoundsProps, 'imgBlockRef' | 'parentRef' | 'apiDrag'>

export const useCountBounds =
    ({
         ...props
     }: useCountBoundsProps) => {
        const {setBounds, cord: {x, y}, scale, currRotate} = useImgStore()

        const updateBounds = () =>
            currRotate % 180 === 0 ?
                countNewBounds({...props, scale, x, y, setBounds}) :
                countNewBoundsRotate({...props, scale, x, y, setBounds})

        return {updateBounds}
    }

type countNewBoundsProps = {
    imgBlockRef: React.RefObject<HTMLImageElement>,
    parentRef: React.RefObject<HTMLDivElement>,
    apiDrag: SpringRef<{ x: number, y: number }>
    scale: number,
    x: number,
    y: number,
    setBounds: ({...bounds}: TBounds) => void,
}

// Рассчёт границ для изображения (условно, если изображение не вписывается в parentRef, то мы центрируем его parentRef)
const countNewBounds =
    ({
         imgBlockRef, parentRef,
         apiDrag,
         scale, x, y,
         setBounds,
     }: countNewBoundsProps) => {

        const sizeMyImg = imgBlockRef.current!.getBoundingClientRect()
        const sizeMyParent = parentRef.current!.getBoundingClientRect()

        const origWidthImg = sizeMyImg.width / scale;
        const origHeightImg = sizeMyImg.height / scale;

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

        console.log('sizeMyImg. W, H')
        console.log(sizeMyImg.width, sizeMyImg.height)
        console.log('sizeMyParent. W, H')
        console.log(sizeMyParent.width, sizeMyParent.height)
        console.log('scale')
        console.log(scale)
        console.log('BOUNDS. B, R, L, T')
        console.log(newBottom, newRight, newLeft, newTop)

        if (x > newRight)
            apiDrag.start({x: newRight})

        if (x < newLeft)
            apiDrag.start({x: newLeft})

        if (y > newBottom)
            apiDrag.start({y: newBottom})

        if (y < newTop)
            apiDrag.start({y: newTop})

    }

// Тот же самыый расчёт, но только при повороте, заменяем высоту на ширину и наоборот
const countNewBoundsRotate =
    ({
         imgBlockRef, parentRef,
         apiDrag,
         scale, x, y,
         setBounds,
     }: countNewBoundsProps) => {
        const sizeMyImg = imgBlockRef.current!.getBoundingClientRect()
        const sizeMyParent = parentRef.current!.getBoundingClientRect()
        const origWidthImg = sizeMyImg.height / scale;
        const origHeightImg = sizeMyImg.width / scale;

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

        if (x > newRight)
            apiDrag.start({x: newRight})

        if (x < newLeft)
            apiDrag.start({x: newLeft})

        if (y > newBottom)
            apiDrag.start({y: newBottom})

        if (y < newTop)
            apiDrag.start({y: newTop})
    }