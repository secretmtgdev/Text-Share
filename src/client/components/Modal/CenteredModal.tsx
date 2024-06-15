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
    )
}

export default CenteredModal;