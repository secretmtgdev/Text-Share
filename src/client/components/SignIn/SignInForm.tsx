/**
 * Custom sign in form.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import axios from 'axios';
import React, { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { SIGNIN_ENDPOINT } from '../../utils/Endpoints';
import { TranslationKeys } from './TranslationKeys';
import PasswordInput from '../FormComponents/PasswordInput/PasswordInput';
import { useAppDispatch } from '../../redux/hooks';
import { setLoginState } from '../../redux/loginSlice';

export interface SignInFormProps {
    closeModalHandler: () => void;
}

const SignInForm = ({ closeModalHandler }: SignInFormProps) => {
    const { t } = useTranslation('accounts/forms');
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const signinForm = document.getElementById('signin-form') as HTMLFormElement;
        const data = new FormData(signinForm);

        try {            
            const response = await axios.post(SIGNIN_ENDPOINT, 
                data,
                {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                }
            );

            if (response.status === 200) {
                dispatch(setLoginState(true));
                closeModalHandler();
            }
        } catch (error) {
            dispatch(setLoginState(false));
            console.error(error);

            // TODO: Handle error from backend
        }
    }

    
    return (
        <form
            onSubmit={handleSubmit}
            method='post'
            encType='multipart/form-data'
            className='form'
            id='signin-form'
        >
            <div className='form-label-container'>
                <label htmlFor='signin-username'>Username:</label>
                <input type='text' id='signin-username' name='signin-username' autoFocus></input>
            </div>
            <div className='form-label-container'>
                <PasswordInput inputName='signin'/>
            </div>
            <div className='form-label-container'>
                <input type='submit' value={t(TranslationKeys.signIn)} className='form-submit' />
            </div>
        </form>
    )
}

export default SignInForm;
