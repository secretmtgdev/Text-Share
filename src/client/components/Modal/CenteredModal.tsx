/**
 * Generic modal component designed to lock user actions that don't apply to the modal.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import React from 'react';

import './CenteredModal.css';

export interface ICenterModalProps {
    title: string;
    form: React.ReactElement;
}

const CenteredModal = ({title, form}: ICenterModalProps) => {
    return (
        <div id='centered-modal-container'>
            <h1>{title}</h1>
            {form}
        </div>
    );
}

export default CenteredModal;
