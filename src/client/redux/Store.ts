import { configureStore } from "@reduxjs/toolkit";

import loginSlice from "./loginSlice";
import signupSlice from "./signupSlice";

export const store = configureStore({
    reducer: {
        loginState: loginSlice,
        signupState: signupSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;