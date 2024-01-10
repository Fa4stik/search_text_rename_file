import React from 'react';

type IconButtonProps = {
    icon: string;
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    classStyles?: string;
    imgSize?: string
}

export const IconButton: React.FC<IconButtonProps> =
        ({icon,
             children,
             onClick,
             classStyles,
             imgSize}) => {
    return (
        <button onClick={onClick} className={`text-mainWhite flex items-center mr-[15px] ${classStyles}`}>
            {children}
            <img src={icon} alt="No border button" className="ml-[5px] h-[20px]"
                 style={{
                     height: imgSize
                 }}
            />
        </button>
    );
};