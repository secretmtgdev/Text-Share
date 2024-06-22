import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

import { FILE_ACTIONS, IError, IFile } from '../utils/Types';

enableMapSet();
interface IFileState {
    actionPerformed: Map<FILE_ACTIONS, number>,
    error: IError,
    selectedFile: IFile
}

const initialState: IFileState = {
    actionPerformed: new Map<FILE_ACTIONS, number>(),
    error: {},
    selectedFile: {
        name: ''
    }
};

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFileErrorState: (state, action: PayloadAction<IError>) => {
            return {
                ...state,
                error: action.payload
            }
        },
        setFileActionPerformed: (state, action: PayloadAction<FILE_ACTIONS>) => {
            if (!state.actionPerformed.has(action.payload)) {
                state.actionPerformed.set(action.payload, 1);
            } else {
                state.actionPerformed.set(action.payload, state.actionPerformed.get(action.payload)! + 1)
            }
        },
        setSelectedFile: (state, action: PayloadAction<IFile>) => {
            return {
                ...state,
                selectedFile: action.payload
            }
        }
    }
});

export const { setFileErrorState, setFileActionPerformed, setSelectedFile } = fileSlice.actions;
export default fileSlice.reducer;