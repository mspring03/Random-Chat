import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SignupContainer = () => {
    const history = useHistory();
    
    useEffect(() => {
        history.push('/login')
    }, [])

    return <div />
}

export default SignupContainer;