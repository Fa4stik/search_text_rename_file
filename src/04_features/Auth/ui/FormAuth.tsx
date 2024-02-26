import React, {useState} from 'react';
import {auth} from "../../../06_shared/ui/icon";
import {EStepsAuth, TStepsAuth} from "../model/types";
import {InputUser} from "./InputUser";
import {InputPass} from "./InputPass";
import {useNavigate} from "react-router-dom";

type FormAuthProps = {}

export const FormAuth: React.FC<FormAuthProps> = ({

}) => {
    const navigate = useNavigate()

    const [step, setStep] =
        useState<TStepsAuth>(EStepsAuth.LOGIN)

    const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        step === EStepsAuth.PASS
            ? navigate('/main')
            : setStep(EStepsAuth.PASS)
    };

    return (
        <form className="bg-mainDark/[0.35] flex flex-col px-8 py-4 rounded-2xl gap-2 text-mainWhite"
              onSubmit={(e) => e.preventDefault()}
        >
            <div className="flex items-center gap-2">
                <img src={auth.logo} alt="" className=""/>
                <p className="text-3xl font-bold">CarrotOCR</p>
            </div>
            <p className="text-xl font-medium">Авторизация</p>
            {step === EStepsAuth.LOGIN
                ? <InputUser/>
                : <InputPass/>}
            <div className="flex justify-end gap-x-2">
                <button className="bg-mainDark px-4 rounded-md"
                        onClick={() => setStep(EStepsAuth.LOGIN)}>
                    Назад
                </button>
                <button className="bg-mainGreen px-4 rounded-md"
                        onClick={handleNextStep}>
                    Дальше
                </button>
            </div>
        </form>
    );
};