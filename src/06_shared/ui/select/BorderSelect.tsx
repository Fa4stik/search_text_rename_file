import React, {useEffect} from 'react';
import {TOption} from "../../model/typeSelect";

type BorderSelectProps = {
    options: TOption[];
    classStyle?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    defaultValue?: string | number | readonly string[] | undefined
}

export const BorderSelect:
    React.FC<BorderSelectProps> = ({options,
                                       classStyle,
                                   onChange,
                                   defaultValue}) => {
    return (
        <select name="SelectTypeTask"
                className={`bg-transparent px-[15px] py-[10px] border-[2px]
                transition-[border-color] ease-in-out focus:border-mainGreen/[0.8]
                border-solid border-mainDark rounded-2xl ${classStyle}`}
                onChange={onChange}
                defaultValue={defaultValue}
        >
            {options.map((option, id) => (
                // selected={id === 1 ? true : false}
                <option value={option.value} key={option.value}>
                    {option.key}
                </option>
            ))}
        </select>
    );
};