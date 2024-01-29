import React from 'react';
import {TBbox, TImgSizes} from "../../FetchPipeline";

type MasksProps = {
    myBoxes: TBbox[];
    imgRect: TImgSizes
}

export const Masks: React.FC<MasksProps> = ({myBoxes, imgRect}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink"
             style={{position: 'absolute',}}>
            <defs>
                <clipPath id="contentMask">
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
                <clipPath id="cropMask">
                    <rect x={imgRect.x1}
                          y={imgRect.y1}
                          width={imgRect.width}
                          height={imgRect.height}
                    />
                </clipPath>
            </defs>
        </svg>
    );
};