/**
 * Custom sign in form.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import React, { FormEvent } from "react";

import "./SignUp.css";

const SignUpForm = () => {
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
    }

    return (
        <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
            className="form"
        >
            <div className='form-label-container'>
                <label htmlFor="signup-username">Username:</label>
                <input type="text" id="signup-username" name="signup-username" autoFocus></input>
            </div>
            <div className='form-label-container'>
                <label htmlFor="signup-password">Password:</label>
                <input type="text" id="signup-password" name="signup-password"></input>
            </div>
            <div className='form-label-container'>
                <label htmlFor="signup-email">Email:</label>
                <input type="text" id="signup-email" name="signup-email"></input>
            </div>
            <div className='form-label-container'>
                <label htmlFor="signup-phone-number">Phone number:</label>
                <input type="tel" id="signup-phone-number" name="signup-phone-number"></input>
            </div>
        </form>
    );
}

export default SignUpForm;
