import React from 'react';

type FillButtonProps = {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    classStyles?: string
}

export const FillButton: React.FC<FillButtonProps> =
    ({children,
     onClick,
     classStyles}) => {
    return (
        <button className={`px-[10px] py-[2px] text-white rounded-md hover:bg-opacity-80 
        transition-all ease-in-out
        mr-[15px] ${classStyles ? classStyles : 'bg-mainGreen'}`}
                onClick={onClick}
        >
            {children}
        </button>
    );
};