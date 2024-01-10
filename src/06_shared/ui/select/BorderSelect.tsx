import React, {useEffect, useState} from 'react';
import {TOption} from "../../model/typeSelect";

type BorderSelectProps = {
    options: TOption[];
    classStyle?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>, value?: string) => void
    defaultValue?: number
}

export const BorderSelect:
    React.FC<BorderSelectProps> = ({options,
                                       classStyle,
                                   onChange,
                                   defaultValue}) => {
    const [selectValue, setSelectValue] =
        useState<number>(defaultValue ?? 0)

    return (
        <select name="SelectTypeTask"
                className={`bg-transparent px-[15px] py-[10px] border-[2px]
                transition-[border-color] ease-in-out focus:border-mainGreen/[0.8]
                border-solid border-mainDark rounded-2xl ${classStyle}`}
                onChange={(e) => {
                    setSelectValue(parseInt(e.target.value))
                    onChange(e, options[parseInt(e.target.value)].key as string)
                }}
                value={selectValue}
        >
            {options.map((option, id) => (
                <option value={option.value} key={option.value}>
                    {option.key}
                </option>
            ))}
        </select>
    );
};