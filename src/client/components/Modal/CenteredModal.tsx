/**
 * Generic modal component designed to lock user actions that don't apply to the modal.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import React from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import './CenteredModal.css';
import { TranslationKeys } from './TranslationKeys';
import IconWrapper from '../IconWrapper/IconWrapper';

export interface ICenterModalProps {
    closeModalHandler: () => void;
    title: string;
    form: React.ReactElement;
}

const CenteredModal = ({closeModalHandler, title, form}: ICenterModalProps) => {
    const { t } = useTranslation('accounts/modals');
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            closeModalHandler();
        }
    }

    return (
        <div id='centered-modal-container' className='flex-column-container'>
            <div id='centered-modal-content' onKeyDown={handleKeyDown}>
                <div className='modal-header'>
                    <h2 tabIndex={0}>{title}</h2>
                    <IconWrapper
                        onClickHandler={closeModalHandler}
                        ariaLabel={t(TranslationKeys.closeModal, {
                            modalName: title.toLocaleLowerCase()
                        })}
                        icon={faXmark}
                    />
                </div>
                {form}
            </div>
        </div>
    );
}

export default CenteredModal;
