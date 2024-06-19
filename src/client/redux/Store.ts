import { configureStore } from "@reduxjs/toolkit";

import loginSlice from "./loginSlice";
import signupSlice from "./signupSlice";
import fileSlice from "./fileSlice";

export const store = configureStore({
    reducer: {
        loginState: loginSlice,
        signupState: signupSlice,
        fileState: fileSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ["setFileActionPerformed"],
            ignoredPaths: ["fileState.actionPerformed"]
          },
        }
    )
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;