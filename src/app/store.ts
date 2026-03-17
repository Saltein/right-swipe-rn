import { configureStore } from "@reduxjs/toolkit";
import { authApi, tokenTriggerReducer } from "../api/authApiSlice";
import inAppNoticeReducer from "../features/inAppNotice/model/inAppNoticeSlice";

export const store = configureStore({
    reducer: {
        tokenTrigger: tokenTriggerReducer,
        inAppNotice: inAppNoticeReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
