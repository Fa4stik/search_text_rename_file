import React from 'react';

type FillButtonProps = {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    classStyles?: string
    inlineStyles?: React.CSSProperties;
}

export const FillButton: React.FC<FillButtonProps> =
    ({children,
     onClick,
     classStyles,
     inlineStyles}) => {
    return (
        <button className={`px-[10px] py-[2px] text-white hover:bg-opacity-80 
        transition-all ease-in-out 
        mr-[15px] ${classStyles}`}
                onClick={onClick}
                style={inlineStyles}
        >
            {children}
        </button>
    );
};