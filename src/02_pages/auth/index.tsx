import React from 'react';
import {auth} from "../../06_shared/ui/icon";
import {FormAuth} from "../../04_features/Auth";

type AuthPage = {}

export const AuthPage: React.FC<AuthPage> = ({

}) => {

    return (
        <div className="max-w-screen h-screen bg-auth flex justify-center items-center">
            <FormAuth/>
        </div>
    );
};