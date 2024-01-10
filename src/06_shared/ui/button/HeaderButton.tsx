import React from 'react';
import {HeaderButtonProps} from "../../model/typeProps";

export const HeaderButton: React.FC<HeaderButtonProps> =
        ({children, icon, onClick}) => {
    return (
        <button onClick={onClick}
                className="flex flex-col items-center justify-center mr-[20px]"
        >
            <img src={icon}
                 alt="Icon for button"
                 className="h-[30px]"
            />
            {children}
        </button>
    );
};