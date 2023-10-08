import React from 'react';

type IconButtonProps = {
    icon: string;
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    classStyles?: string;
}

export const IconButton: React.FC<IconButtonProps> =
        ({icon,
             children,
             onClick,
             classStyles}) => {
    return (
        <button onClick={onClick} className={`text-mainWhite flex mr-[15px] ${classStyles}`}>
            {children}
            <img src={icon} alt="No border button" className="ml-[5px] h-[20px]"/>
        </button>
    );
};