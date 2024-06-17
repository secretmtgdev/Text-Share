/**
 * Component which loads a centered modal allowing the user to sign up for a personalized text viewing experience.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import React, { useState } from "react";
import { connect } from 'react-redux';

import CenteredModal from "../Modal/CenteredModal";
import { mapStateToProps } from "../../utils/Constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSigningUpState } from "../../redux/signupSlice";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
    const dispatch = useAppDispatch();
    const loginState = useAppSelector(state => state.loginState);
    const signupState = useAppSelector(state => state.signupState)
    return (
        <>
            { !loginState.isLoggedIn && (
                <div id='sign-up-container'>
                    <a onClick={() => dispatch(setSigningUpState(true))}>Sign Up</a>
                    {signupState.isSigningUp && !loginState.isLoggingIn && <CenteredModal title={'Sign up'} form={<SignUpForm />} />}
                </div>
            )}
        </>
    );
}

/** Connect this component to the global store */
export default connect(mapStateToProps)(SignUp);
