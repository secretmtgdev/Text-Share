/**
 * Inform the user that content was not able to be pushed to the server.
 * 
 * @version 1.0.0
 * @author Michael Wilson
 */
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import GenericError from "./GenericError";
import { useAppSelector } from "../../redux/hooks";
import { mapStateToProps } from "../../utils/Constants";
import { TranslationKeys } from "./TranslationKeys";

const UnableToUploadFile = () => {
    const { t } = useTranslation('files/errors');
    const fileState = useAppSelector(state => state.fileState);
    return (
        <GenericError
            title={t(TranslationKeys.unableToUploadFile)} 
            message={t(TranslationKeys.errorMessage, { 
                code: `${fileState.error.code}`,
                message: fileState.error.message}
            )}
        />
    );
};

export default connect(mapStateToProps)(UnableToUploadFile);
