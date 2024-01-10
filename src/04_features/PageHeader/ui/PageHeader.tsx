import React from 'react';
import {HeaderButton} from "../../../06_shared/ui/button";
import {HeaderButtonProps} from "../../../06_shared/model/typeProps";

type PageHeaderProps = {
    buttonProps: HeaderButtonProps[]
}

export const PageHeader: React.FC<PageHeaderProps> = ({buttonProps}) => {
    return (
        <div className="flex my-[20px]">
            {buttonProps.map((button, id) => (
                <HeaderButton key={id} icon={button.icon} onClick={button.onClick}>
                    {button.children}
                </HeaderButton>
            ))}
        </div>
    );
};