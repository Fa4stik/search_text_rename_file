import React from 'react';
import {imageWrapper} from "../../../06_shared/ui/icon";
import {SpringRef} from "react-spring";

type ZoomBlockProps = {
    apiWheel: SpringRef<{scale: number}>
    scaleFactor: number,
    minSizeScaleImg: number,
    maxSizeScaleImg: number
    updateBounds: (scale: number) => void
}

export const ZoomBlock: React.FC<ZoomBlockProps> =
    ({
        apiWheel,
        scaleFactor,
        maxSizeScaleImg,
        minSizeScaleImg,
        updateBounds
     }) => {

    const handleZoomIn = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        const newScale = apiWheel.current[0].get().scale - (-102) * scaleFactor;
        const clampedScale = Math.max(minSizeScaleImg, Math.min(newScale, maxSizeScaleImg));
        apiWheel.start({scale: clampedScale, onChange: (result) => {
                updateBounds(result.value.scale)
            }})
    };

    const handleZoomOut = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        const newScale = apiWheel.current[0].get().scale - (102) * scaleFactor;
        const clampedScale = Math.max(minSizeScaleImg, Math.min(newScale, maxSizeScaleImg));
        apiWheel.start({scale: clampedScale, onChange: (result) => {
                updateBounds(result.value.scale)
            }})
    };

    return (
        <>
            <img src={imageWrapper.zoomIn} alt="Zoom In"
                 className="h-full"
                 onClick={handleZoomIn}
            />
            <img src={imageWrapper.zoomOut} alt="Zoom Out"
                 className="h-full"
                 onClick={handleZoomOut}
            />
        </>
    );
};