import React, {useState} from 'react';
import {imageWrapper} from "../../../06_shared/ui/icon";
import {DropDownMenu} from "../../DropDownMenu";
import {TOption} from "../../../06_shared/model/typeSelect";

type RefreshBlockProps = {
    models: TOption[],
    handleChoseOption?: (e: React.MouseEvent<HTMLSpanElement>, value: string | number) => void,
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const RefreshBlock: React.FC<RefreshBlockProps> = ({
    models,
    handleChoseOption,
    setIsEdit
}) => {
    const [isActiveRefresh, setIsActiveRefresh] =
        useState<boolean>(false)

    const handleRefresh = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsActiveRefresh(prevState => !prevState)
    };

    return (
        <div className="relative flex justify-center min-w-[30px]">
            <img src={imageWrapper.refresh} alt="Regenerate" className="h-full w-[30px]"
                 onClick={handleRefresh}
            />
            {isActiveRefresh && <div className="absolute bottom-[55px] right-0 translate-x-1/3 z-50">
                <DropDownMenu options={models}
                              setIsActiveRefresh={setIsActiveRefresh}
                              handleChoseOption={handleChoseOption}
                              setIsEdit={setIsEdit}
                />
            </div>}
        </div>
    );
};