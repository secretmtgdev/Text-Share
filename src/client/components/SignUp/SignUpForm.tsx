/**
 * Custom sign in form.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import React, { FormEvent } from "react";
import axios from "axios";

import { isValidEmail } from "../../utils/Utils";
import { SIGNUP_ENDPOINT } from "../../utils/Endpoints";

import "./SignUp.css";

const SignUpForm = () => {
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const signupForm = document.getElementById('signup-form') as HTMLFormElement;
        const data = new FormData(signupForm);
        const email = data.get('signup-email');

        // TODO: Handle error invalid case
        if (email && !isValidEmail(email.toString())) {
            console.error('INVALID EMAIL ENTERED');
            return;
        }

        try {            
            const response = await axios.post(SIGNUP_ENDPOINT, 
                data,
                {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                }
            );

            // TODO: Let the user know that the sign up was successful
            if (response.status === 200) {
            }
        } catch (error) {
            console.error(error);

            // TODO: Handle error from backend
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
            className="form"
            id="signup-form"
        >
            <div className='form-label-container'>
                <label htmlFor="signup-username">Username:</label>
                <input type="text" id="signup-username" name="signup-username" required autoFocus></input>
            </div>
            <div className='form-label-container'>
                <label htmlFor="signup-password">Password:</label>
                <input type="text" id="signup-password" name="signup-password" required></input>
            </div>
            <div className='form-label-container'>
                <label htmlFor="signup-email">Email:</label>
                <input type="text" id="signup-email" name="signup-email" required></input>
            </div>
            <div className='form-label-container'>
                <label htmlFor="signup-phone-number">
                    Phone number:<br />
                    <small>Format: xxx-xxx-xxxx</small>
                </label>
                <input type="tel" id="signup-phone-number" name="signup-phone-number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input>
            </div>
            <button type="submit">Sign up now!</button>
        </form>
    );
}

export default SignUpForm;
