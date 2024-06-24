/**
 * Custom sign in form.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import React, { FormEvent } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { isValidEmail } from '../../utils/Utils';
import { SIGNUP_ENDPOINT } from '../../utils/Endpoints';
import { TranslationKeys } from './TranslationKeys';
import PasswordInput from '../FormComponents/PasswordInput/PasswordInput';

import './SignUp.css';

export interface SignUpFormProps {
    closeModalHandler: () => void;
}

const SignUpForm = ({ closeModalHandler }: SignUpFormProps) => {
    const { t } = useTranslation('accounts/forms');

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

            if (response.status === 200) {
                closeModalHandler();
            }
        } catch (error) {
            console.error(error);

            // TODO: Handle error from backend
        }
    };    

    return (
        <form
            onSubmit={handleSubmit}
            method='post'
            encType='multipart/form-data'
            className='form'
            id='signup-form'
        >
            <div className='form-label-container'>
                <label htmlFor='signup-username'>{t(TranslationKeys.username)}:</label>
                <input type='text' id='signup-username' name='signup-username' className='form-input' required autoFocus></input>
            </div>
            <div className='form-label-container'>
                <PasswordInput inputName='signup'/>
            </div>
            <div className='form-label-container'>
                <label htmlFor='signup-email'>{t(TranslationKeys.email)}:</label>
                <input type='text' id='signup-email' name='signup-email' className='form-input' required></input>
            </div>
            <div className='form-label-container'>
                <label htmlFor='signup-phone-number'>
                    {t(TranslationKeys.phoneNumber)}:<br />
                    <small>{t(TranslationKeys.phoneNumberFormat)}: xxx-xxx-xxxx</small>
                </label>
                <input type='tel' id='signup-phone-number' name='signup-phone-number' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' className='form-input'></input>
            </div>
            <div className='form-label-container'>
                <input type='submit' value={t(TranslationKeys.signUp)} className='form-submit' />
            </div>
        </form>
    );
}

export default SignUpForm;
