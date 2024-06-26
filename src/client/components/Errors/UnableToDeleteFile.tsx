/**
 * Inform the user that content was not able to be delete from the server.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import GenericError from './GenericError';
import { useAppSelector } from '../../redux/hooks';
import { mapStateToProps } from '../../utils/Constants';
import { TranslationKeys } from './TranslationKeys';

const UnableToDeleteFile = () => {
    const { t } = useTranslation('files/errors');
    const fileState = useAppSelector(state => state.fileState);
    const [showError, setShowError] = useState(!!fileState.error);
    useEffect(() => {
        setShowError(!!fileState.error);
    }, [fileState.error]);

    return (
        <>
            {
                showError &&
                <GenericError
                    setShowError={setShowError}
                    title={t(TranslationKeys.unableToDeleteFile)} 
                    message={t(TranslationKeys.errorMessage, { 
                        code: `${fileState.error.code}`,
                        message: fileState.error.message}
                    )}
                />
            }
        </>        
    );
};

export default connect(mapStateToProps)(UnableToDeleteFile);
