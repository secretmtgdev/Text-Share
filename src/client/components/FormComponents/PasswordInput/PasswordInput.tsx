/**
 * Custom input component to ensure a uniform look and feel of all password related inputs.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import React, { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import IconWrapper from '../../IconWrapper/IconWrapper';
import { TranslationKeys } from './TranslationKeys';

import './PasswordInput.css';

const PasswordInput = () => {
    const { t } = useTranslation('accounts/forms');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='toggle-input-container'>
            <label htmlFor='signup-password'>{t(TranslationKeys.password)}:</label>
            <span className='form-input-password form-input'>
                <input type={showPassword ? 'password' : 'text'} id='signup-password' name='signup-password' required></input>
                <span className='password-toggle'>
                    {
                        showPassword ? (
                            <IconWrapper onClickHandler={() => setShowPassword(false)} ariaLabel={t(TranslationKeys.showPassword)} icon={faEye} />
                        ) : (                           
                            <IconWrapper onClickHandler={() => setShowPassword(true)} ariaLabel={t(TranslationKeys.hidePassword)} icon={faEyeSlash} />
                        )
                    }
                </span>
            </span>
        </div>
    )

};

export default PasswordInput;
