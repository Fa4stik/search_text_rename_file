import React from 'react';
import {TOption} from "../../../06_shared/model/typeSelect";

type DropDownMenuProps = {
    options: TOption[]
    setIsActiveRefresh: React.Dispatch<React.SetStateAction<boolean>>
    handleChoseOption?: (e: React.MouseEvent<HTMLSpanElement>, value: string | number) => void
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const DropDownMenu: React.FC<DropDownMenuProps> = ({options,
                                                              setIsActiveRefresh,
                                                          handleChoseOption,
                                                              setIsEdit}) => {
    const handleChooseOption = (e: React.MouseEvent<HTMLSpanElement>, value: string | number) => {
        e.preventDefault()
        setIsActiveRefresh(false)
        setIsEdit(false)
        handleChoseOption && handleChoseOption(e, value)
    }

    return (
        <div className="w-full h-full flex flex-col items-center text-white">
            <div className="w-auto h-auto
            flex flex-col">
                {options.map(option => (<span key={option.key}
                                              className="w-full h-[35px] px-[20px] flex items-center justify-center
                                              bg-gray-900/[0.9] first:rounded-t-xl last:rounded-b-xl
                                              hover:bg-mainGreen/[0.9] align-middle leading-none"
                                              onClick={(e) => handleChooseOption(e, option.value)}
                >
                    {option.value}
                </span>))}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="15" className="opacity-[0.9]">
                <polygon points="0,0 40,0 20,15" fill="#111827"/>
            </svg>
        </div>
    );
};