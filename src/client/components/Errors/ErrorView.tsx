import React from "react";
import { connect } from "react-redux";

import { useAppSelector } from "../../redux/hooks";
import { ERROR_TYPES } from "../../utils/Types";
import UnableToDeleteFile from "./UnableToDeleteFile";
import UnableToLoadFiles from "./UnableToLoadFiles";
import UnableToUploadFile from "./UnableToUploadFile";
import { mapStateToProps } from "../../utils/Constants";

const ErrorView = () => {
  const fileState = useAppSelector(state => state.fileState);

  const ErrorToShow = () => {
    switch(fileState.error.type) {
      case ERROR_TYPES.FILE_DELETE:
        return <UnableToDeleteFile />
      case ERROR_TYPES.FILE_LIST:
        return <UnableToLoadFiles />
      case ERROR_TYPES.FILE_UPLOAD:
        return <UnableToUploadFile />
      default:
        return <></>
    }
  }

    return (
        <>
            {!!fileState.error.code && ErrorToShow()}
        </>
    )
}

export default connect(mapStateToProps)(ErrorView);
