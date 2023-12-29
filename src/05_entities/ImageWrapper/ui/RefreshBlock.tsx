import React from 'react';
import {imageWrapper} from "../../../06_shared/ui/icon";
import {DropDownMenu} from "../../DropDownMenu";

type RefreshBlockProps = {}

export const RefreshBlock: React.FC<RefreshBlockProps> = ({}) => {
    return (
        <div className="relative flex justify-center">
            <img src={imageWrapper.refresh} alt="Regenerate" className="h-full"
                 // onClick={handleRefresh}
            />
            {/*{isActiveRefresh && <div className="absolute bottom-[55px] -right-[10%] z-50">*/}
            {/*    <DropDownMenu options={models}*/}
            {/*                  setIsActiveRefresh={setIsActiveRefresh}*/}
            {/*                  handleChoseOption={handleChoseOption}*/}
            {/*                  setIsEdit={setIsEdit}*/}
            {/*    />*/}
            {/*</div>}*/}
        </div>
    );
};