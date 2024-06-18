import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IError } from '../utils/Types';

const initialState: IError = {};

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFileErrorState: (state, action: PayloadAction<IError>) => {
            return action.payload;
        }
    }
});

export const { setFileErrorState } = fileSlice.actions;
export default fileSlice.reducer;