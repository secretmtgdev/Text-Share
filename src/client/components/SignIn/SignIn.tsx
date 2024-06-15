/**
 * This component handles the sign in action of a user.
 * 
 * @verison 1.0.0
 * @author Michael Wilson
 */
import React, { useState } from "react";
import { connect } from "react-redux";

import CenteredModal from "../Modal/CenteredModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { mapStateToProps } from "../../utils/Constants";
import { setLoggingInState } from "../../redux/loginSlice";

import './SignIn.css';
import SignInForm from "./SignInForm";

const SignIn = () => {
    const dispatch = useAppDispatch();
    const loginState = useAppSelector(state => state.loginState);
    const signupState = useAppSelector(state => state.signupState);

    return (
        <>
            { !loginState.isLoggedIn && (
                <div id='sign-in-container'>
                    <a onClick={() => dispatch(setLoggingInState(true))}>Sign In</a>
                    {loginState.isLoggingIn && !signupState.isSigningUp && <CenteredModal title={'Log in'} form={<SignInForm />}/>}
                </div>
            )}
        </>
    )
}

/** Connect this component to the global store */
export default connect(mapStateToProps)(SignIn);