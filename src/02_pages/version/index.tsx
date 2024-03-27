import React, {useEffect, useState} from 'react';
import packageJson from '../../../package.json'

type VersionPageProps = {}

const VersionPage: React.FC<VersionPageProps> = ({}) => {
    const [backVersion, setBackVersion] =
        useState('')

    useEffect(() => {
        fetch([
            window.location.protocol, '//',
            process.env.REACT_APP_SERVER_PATH ?? window.location.host,
            '/api/get-backend-version/'
        ].join(''))
            .then(resp => resp.json())
            .then(answer => setBackVersion(answer))
    }, []);

    return (
        <div className="max-w-screen h-screen p-6 flex flex-col">
            <p>Version front {packageJson.version}</p>
            <p>Version back {backVersion}</p>
        </div>
    );
};

export default VersionPage