import React from 'react';
import {auth} from "../../../06_shared/ui/icon";

type InputPassProps = {}

export const InputPass: React.FC<InputPassProps> = ({

}) => {

    return (
        <div className="flex relative">
            <input type="password"
                   className="bg-transparent border-solid border-b-2 border-b-mainWhite
                           outline-none w-[25vw] py-1 pl-6 placeholder-mainGray/[0.5]"
                   placeholder="Пароль"
            />
            <img src={auth.pass} alt="Logo carrot ocr"
                 className="absolute left-0 top-1/2 -translate-y-1/2"
            />
        </div>
    );
};