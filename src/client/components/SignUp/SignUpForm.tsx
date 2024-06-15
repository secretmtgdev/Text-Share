/**
 * Custom sign in form.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import React, { FormEvent } from "react";

const SignUpForm = () => {
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        
    }

    return (
        <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data">
            <label htmlFor="signin-username">Username:</label>
            <input type="text" id="signup-username" name="username"></input>
            <label htmlFor="signin-password">Password:</label>
            <input type="text" id="signup-password" name="password"></input>
            <label htmlFor="signup-email">Email:</label>
            <input type="text" id="signup-email" name="email"></input>
        </form>
    )
}

export default SignUpForm;