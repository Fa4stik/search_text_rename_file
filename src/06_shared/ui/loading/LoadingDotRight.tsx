import React from 'react';

export const LoadingDotRight = () => {
    return (
        <div className="absolute z-50 w-full h-full bg-mainDark/[0.8] cursor-auto
                        flex items-center justify-center gap-x-2">
            <div className="w-[80px] h-[80px] inline-block relative">
                <div className="rounded-full top-[33px] w-[13px] animate-lds-ellipsis1 left-[8px]
                                h-[13px] bg-mainWhite absolute animate-[cubic-bezier(0,1,1,0)]"/>
                <div className="rounded-full top-[33px] w-[13px] animate-lds-ellipsis2 left-[8px]
                                h-[13px] bg-mainWhite absolute animate-[cubic-bezier(0,1,1,0)]"/>
                <div className="rounded-full top-[33px] w-[13px] animate-lds-ellipsis2 left-[32px]
                                h-[13px] bg-mainWhite absolute animate-[cubic-bezier(0,1,1,0)]"/>
                <div className="rounded-full top-[33px] w-[13px] animate-lds-ellipsis3 left-[56px]
                                h-[13px] bg-mainWhite absolute animate-[cubic-bezier(0,1,1,0)]"/>
            </div>
        </div>
    );
};