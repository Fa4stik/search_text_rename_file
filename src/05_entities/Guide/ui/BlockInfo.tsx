import React from 'react';
import {guide} from "../../../06_shared/ui/icon";

type BlockInfoProps = {
    className: string
    children: React.ReactNode
    left?: boolean
    top?: boolean
    right?: boolean
    bottom?: boolean
}

export const BlockInfo: React.FC<BlockInfoProps> = ({
    children,
    className,
    top,
    bottom,
    right,
    left
}) => {
    return (
        <div className={`${className}
            ${bottom && 'flex-col-reverse'}
            ${right && 'flex-row-reverse'}
            ${top && 'flex-col justify-center items-center'}
            flex w-full absolute whitespace-nowrap text-mainWhite gap-2 text-xl`}>
            <img src={guide.arrow} alt="Tipps"
                 className={`
                 ${bottom && '-rotate-90'}
                 ${right && 'rotate-180'}
                 ${top && 'rotate-90'}
                 `}
            />
            <p className="ring-1 ring-mainWhite p-2 rounded-xl">{children}</p>
        </div>
    );
};