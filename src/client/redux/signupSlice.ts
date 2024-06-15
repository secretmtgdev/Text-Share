import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISignUp {
    isSigningUp: boolean
}

const initialState: ISignUp = {
    isSigningUp: false
}

export const signupSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        setSigningUpState: (state, action: PayloadAction<boolean>) => {
            state.isSigningUp = action.payload
        }
    }
});

export const { setSigningUpState } = signupSlice.actions;
export default signupSlice.reducer;