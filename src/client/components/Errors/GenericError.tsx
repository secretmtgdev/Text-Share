/**
 * Component used to handle server and client errors with a visual display of what went wrong.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */

import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { IImage } from '../../utils/Types';
import CenteredModal from '../Modal/CenteredModal';
import { mapStateToProps } from '../../utils/Constants';

export type GenericErrorProps = {
    setShowError: Dispatch<SetStateAction<boolean>>;
    title: string;
    message: string;
    imgRef?: IImage;
}

const GenericError = ({ setShowError, title, message, imgRef }: GenericErrorProps) => {
    const { t } = useTranslation();
    return (
        <CenteredModal
            closeModalHandler={() => { setShowError(false) }}
            title={t(title)}
            form={(
                <div id='error-container'>
                    <p>
                        {t(message)}
                    </p>
                    {imgRef && 
                        <img src={imgRef.src} alt={t(imgRef.alt)} />}
                </div>
            )}
        />
    );
};

export default connect(mapStateToProps)(GenericError);
