/**
 * This component handles the sign in action of a user.
 * 
 * @verison 1.0.0
 * @author Michael Wilson
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CenteredModal from '../Modal/CenteredModal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { mapStateToProps } from '../../utils/Constants';
import { setLoggingInState } from '../../redux/loginSlice';
import SignInForm from './SignInForm';

import './SignIn.css';

const SignIn = () => {
    const dispatch = useAppDispatch();
    const loginState = useAppSelector(state => state.loginState);
    const signupState = useAppSelector(state => state.signupState);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        setShowModal(loginState.isLoggingIn && !signupState.isSigningUp);
    }, [loginState.isLoggingIn, signupState.isSigningUp]);

    const handleModalClose = () => {
        setShowModal(false);
        dispatch(setLoggingInState(false));
    };

    return (
        <>
            { !loginState.isLoggedIn && (
                <div id='sign-in-container' className='btn'>
                    <button className='nav-btn' onClick={() => dispatch(setLoggingInState(true))}>Sign In</button>
                    {showModal && <CenteredModal closeModalHandler={handleModalClose} title={'Log in'} form={<SignInForm />}/>}
                </div>
            )}
        </>
    );
}

/** Connect this component to the global store */
export default connect(mapStateToProps)(SignIn);
