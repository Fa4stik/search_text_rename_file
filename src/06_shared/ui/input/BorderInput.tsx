import React, {CSSProperties} from 'react';

type BorderInputProps = {
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    classStyle?: string;
    value?:string;
    inlineStyles?: CSSProperties;
}

export const BorderInput: React.FC<BorderInputProps> =
    ({onChange,
     placeholder,
     classStyle,
     value,
     inlineStyles}) => {

    return (
        <input type="text" className={`bg-transparent px-[15px] py-[7px] transition-[border-color]
            ease-in-out focus:border-mainGreen/[0.8]
            border-[2px] border-solid border-mainDark focus:outline-none rounded-2xl ${classStyle}`}
               placeholder={placeholder}
               onChange={onChange}
               value={value}
               style={{
                   zIndex: 20,
                   ...inlineStyles
               }}
        />
    );
};