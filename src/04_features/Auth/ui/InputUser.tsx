import React from 'react';
import {auth} from "../../../06_shared/ui/icon";

type InputUserProps = {}

export const InputUser: React.FC<InputUserProps> = ({

}) => {

    return (
        <div className="flex relative">
            <input type="text"
                   className="bg-transparent border-solid border-b-2 border-b-mainWhite
                           outline-none w-[25vw] py-1 pl-6 placeholder-mainGray/[0.5]"
                   placeholder="Имя пользователя"
            />
            <img src={auth.user} alt="Logo carrot ocr"
                 className="absolute left-0 top-1/2 -translate-y-1/2"
            />
        </div>
    );
};