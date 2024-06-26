import React from 'react';
import SignIn from '../../SignIn/SignIn';
import SignUp from '../../SignUp/SignUp';

const LoggedOutNavbar = () => {
    return (
        <>
            <SignIn />
            <SignUp />
        </>
    )
};

export default LoggedOutNavbar;
