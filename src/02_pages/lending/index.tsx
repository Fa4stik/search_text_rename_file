import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const LendingPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/main')
    }, [])
    return (
        <div>
            Lending page
        </div>
    );
};

export default LendingPage;