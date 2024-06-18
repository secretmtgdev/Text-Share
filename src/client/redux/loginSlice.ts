import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoginState {
    isLoggedIn: boolean;
    isLoggingIn: boolean;
}

const initialState: ILoginState = {
    isLoggedIn: false,
    isLoggingIn: false
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginState: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoggedIn: action.payload
            };
        },
        setLoggingInState: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoggingIn: action.payload
            };
        }
    }
});

export const { setLoginState, setLoggingInState } = loginSlice.actions;
export default loginSlice.reducer;
