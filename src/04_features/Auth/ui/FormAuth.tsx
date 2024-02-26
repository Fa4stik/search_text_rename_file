import React, {useState} from 'react';
import {auth} from "../../../06_shared/ui/icon";
import {InputUser} from "./InputUser";
import {EStepsAuth, TStepsAuth} from "../model/types";

type FormAuthProps = {}

export const FormAuth: React.FC<FormAuthProps> = ({

}) => {
    const [step, setStep] =
        useState<TStepsAuth>(EStepsAuth.LOGIN)

    return (
        <form className="bg-mainDark/[0.35] flex flex-col px-8 py-4 rounded-2xl gap-2 text-mainWhite">
            <div className="flex items-center gap-2">
                <img src={auth.logo} alt="" className=""/>
                <p className="text-3xl font-bold">CarrotOCR</p>
            </div>
            <p className="text-xl font-medium">Авторизация</p>
            <InputUser/>
            <div className="flex justify-end gap-x-2">
                <button className="bg-mainDark px-4 rounded-md">
                    Назад
                </button>
                <button className="bg-mainGreen px-4 rounded-md">
                    Дальше
                </button>
            </div>
        </form>
    );
};