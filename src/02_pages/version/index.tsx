import React from 'react';
import packageJson from '../../../package.json'

type VersionPageProps = {}

const VersionPage: React.FC<VersionPageProps> = ({}) => {
    return (
        <div className="max-w-screen h-screen p-6">
            Version {packageJson.version}
        </div>
    );
};

export default VersionPage