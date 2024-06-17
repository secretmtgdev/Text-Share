/**
 * Custom sign in form.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import React from "react";

const SignInForm = () => {
    return (
        <form>
            <label htmlFor="signin-username">Username:</label>
            <input type="text" id="signin-username" name="username"></input>
            <label htmlFor="signin-password">Password:</label>
            <input type="text" id="signin-password" name="password"></input>
        </form>
    )
}

export default SignInForm;
