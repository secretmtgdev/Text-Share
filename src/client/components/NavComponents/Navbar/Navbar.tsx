import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import SignIn from '../../SignIn/SignIn';
import SignUp from '../../SignUp/SignUp';
import { mapStateToProps } from '../../../utils/Constants';
import { useAppSelector } from '../../../redux/hooks';

import './Navbar.css';
import LoggedOutNavbar from './LoggedOutNavbar';
import LoggedInNavbar from './LoggedInNavbar';

const Navbar = () => {
    const loginState = useAppSelector(state => state.loginState);
    useEffect(() => {}, [loginState.isLoggedIn]);
    
    return (
        <div id='navbar-container'>
            {!loginState.isLoggedIn ?
                <LoggedOutNavbar /> :
                <LoggedInNavbar />
            }
        </div>
    );
};

export default connect(mapStateToProps)(Navbar);

