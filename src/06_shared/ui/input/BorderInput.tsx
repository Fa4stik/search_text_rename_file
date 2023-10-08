import React from 'react';

type BorderInputProps = {
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const BorderInput: React.FC<BorderInputProps> =
    ({onChange,
     placeholder}) => {
    return (
        <input type="text" className="bg-transparent px-[15px] py-[10px] transition-[border-color]
        ease-in-out focus:border-mainGreen/[0.8]
        border-[2px] border-solid border-mainDark focus:outline-none rounded-2xl"
               placeholder={placeholder}
               onChange={onChange}
        />
    );
};