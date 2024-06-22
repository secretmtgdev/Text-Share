/**
 * Custom sign in form.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import React, { FormEvent } from "react";

const SignInForm = () => {
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
                <label htmlFor="signin-username">Username:</label>
                <input type="text" id="signin-username" name="signin-username" autoFocus></input>
            </div>
            <div className='form-label-container'>
                <label htmlFor="signin-password">Password:</label>
                <input type="text" id="signin-password" name="signin-password"></input>
            </div>
        </form>
    )
}

export default SignInForm;
