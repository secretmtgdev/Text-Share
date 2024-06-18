/**
 * Wrapper for font awesome's icons. This is intended to add some style flexibility on my end.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './IconWrapper.css';
import { useTranslation } from 'react-i18next';

export interface IconWrapperProps {
    onClickHandler: () => void;
    ariaLabel: string;
    icon: IconProp
}

const IconWrapper = ({ onClickHandler, ariaLabel, icon }: IconWrapperProps) => {
    const { t } = useTranslation();
    return (
        <div className='icon-wrapper' onClick={onClickHandler}>
            <a className='icon-btn' aria-label={t(ariaLabel)}>
                <FontAwesomeIcon icon={icon} />
            </a>
        </div>
    )
};

export default IconWrapper;
