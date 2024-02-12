import React, {useEffect, useState} from 'react';
import packageJson from '../../../package.json'
import {getEnv} from "../../05_entities/FetchEnv";

type VersionPageProps = {}

const VersionPage: React.FC<VersionPageProps> = ({}) => {
    const [backVersion, setBackVersion] =
        useState('')

    useEffect(() => {
        getEnv().then(process => {
            fetch(`${process.env.REACT_APP_API_PROTOCOL}://` +
            `${process.env.REACT_APP_SERVER_PATH}:${process.env.REACT_APP_SERVER_PORT}/api/get-backend-version/`)
                .then(resp => resp.json())
                .then(answer => {
                    setBackVersion(answer)
                })
        })
    }, []);

    return (
        <div className="max-w-screen h-screen p-6 flex flex-col">
            <p>Version front {packageJson.version}</p>
            <p>Version back {backVersion}</p>
        </div>
    );
};

export default VersionPage