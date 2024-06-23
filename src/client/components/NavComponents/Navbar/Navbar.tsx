import React from 'react';
import { connect } from 'react-redux';

import SignIn from '../../SignIn/SignIn';
import SignUp from '../../SignUp/SignUp';
import { mapStateToProps } from '../../../utils/Constants';

import './Navbar.css';

const Navbar = () => {
    return (
        <div id='navbar-container'>
            <SignIn />
            <SignUp />
        </div>
    );
};

export default connect(mapStateToProps)(Navbar);

