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

export interface IconWrapperProps {
    onClickHandler: () => void;
    ariaLabel: string;
    icon: IconProp
}

const IconWrapper = ({ onClickHandler, ariaLabel, icon }: IconWrapperProps) => {
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            onClickHandler();
        }
    }

    return (
        <div className='icon-wrapper' onClick={onClickHandler} title={ariaLabel} onKeyDown={onKeyDownHandler} tabIndex={0}>
            <div role='button' className='icon-btn' aria-label={ariaLabel} tabIndex={1}>
                <FontAwesomeIcon height='15px' width='15px' icon={icon} />
            </div>
        </div>
    )
};

export default IconWrapper;
