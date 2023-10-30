import React, {CSSProperties, useRef, useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type IconInputProps = {
    placeholder: string;
    icon: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    classStyle?: string
    inlineStyles?: React.CSSProperties
    classStyleIco?: string
    value: string;
}

export const IconInput: React.FC<IconInputProps> =
        ({icon,
         placeholder,
         onChange,
         classStyle,
         classStyleIco,
         inlineStyles,
             value}) => {
    return (
        <label className="relative mr-[15px]">
            <img src={icon} alt="Icon for input" className={`absolute right-0 top-[2px] w-[22px] ${classStyleIco}`}/>
            <input type="text"
                   placeholder={placeholder}
                   className={`pr-[25px] py-[2px] focus:outline-none bg-transparent w-[170px] transition-[border-bottom]
                       ease-in-out focus:border-mainGreen duration-500
                       text-mainWhite border-solid border-b-[2px] border-mainWhite ${classStyle}`}
                   style={inlineStyles}
                   value={value}
                   onChange={onChange}
            />
        </label>
    );
};