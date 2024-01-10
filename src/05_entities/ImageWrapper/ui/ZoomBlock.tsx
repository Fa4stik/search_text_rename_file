import React from 'react';
import {imageWrapper} from "../../../06_shared/ui/icon";

type ZoomBlockProps = {}

export const ZoomBlock: React.FC<ZoomBlockProps> = ({}) => {
    return (
        <>
            <img src={imageWrapper.zoomIn} alt="Zoom In"
                 className="h-full"
                 // onClick={handleZoomIn}
            />
            <img src={imageWrapper.zoomOut} alt="Zoom Out"
                 className="h-full"
                 // onClick={handleZoomOut}
            />
        </>
    );
};