import React from 'react';
import {TOption} from "../../model/typeSelect";

type BorderSelectProps = {
    options: TOption[];
    classStyle?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const BorderSelect:
    React.FC<BorderSelectProps> = ({options,
                                       classStyle,
                                   onChange}) => {
    return (
        <select name="SelectTypeTask" id=""
                className={`bg-transparent px-[15px] py-[10px] border-[2px]
                transition-[border-color] ease-in-out focus:border-mainGreen/[0.8]
                border-solid border-mainDark rounded-2xl ${classStyle}`}
                onChange={onChange}
        >
            {options.map(option => (
                <option value={option.value} key={option.value}>
                    {option.key}
                </option>
            ))}
        </select>
    );
};