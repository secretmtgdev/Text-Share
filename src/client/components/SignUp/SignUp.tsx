/**
 * Component which loads a centered modal allowing the user to sign up for a personalized text viewing experience.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CenteredModal from '../Modal/CenteredModal';
import { mapStateToProps } from '../../utils/Constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSigningUpState } from '../../redux/signupSlice';
import SignUpForm from './SignUpForm';

import './SignUp.css';

const SignUp = () => {
    const dispatch = useAppDispatch();
    const loginState = useAppSelector(state => state.loginState);
    const signupState = useAppSelector(state => state.signupState)
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        setShowModal(signupState.isSigningUp && !loginState.isLoggingIn);
    }, [signupState.isSigningUp, loginState.isLoggingIn]);

    const handleModalClose = () => {
        setShowModal(false);
        dispatch(setSigningUpState(false));
    };

    return (
        <>
            { !loginState.isLoggedIn && (
                <div id='sign-up-container' className='btn'>
                    <button className='nav-btn' onClick={() => dispatch(setSigningUpState(true))}>Sign Up</button>
                    {showModal && <CenteredModal closeModalHandler={handleModalClose} title={'Sign up'} form={<SignUpForm />} />}
                </div>
            )}
        </>
    );
}

/** Connect this component to the global store */
export default connect(mapStateToProps)(SignUp);
