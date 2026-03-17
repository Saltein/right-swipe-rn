import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../shared/consts/consts";
import {
    AuthMeResponse,
    LoginParams,
    LoginResponse,
    LogoutResponse,
    RegisterParams,
    RegisterResponse,
    SendCodeParams,
    SendCodeResponse,
    VerifyCodeParams,
    VerifyCodeResponse,
} from "./authTypes";
import { tokenStorage } from "../app/storage";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
        const token = await tokenStorage.getToken();
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set("X-Client-Type", "mobile");

        return headers;
    },
});

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (builder) => ({
        sendCode: builder.mutation<SendCodeResponse, SendCodeParams>({
            query: (body) => ({
                url: `auth/send-code`,
                method: "POST",
                body,
            }),
        }),
        verifyCode: builder.mutation<VerifyCodeResponse, VerifyCodeParams>({
            query: (body) => ({
                url: `auth/verify-code`,
                method: "POST",
                body,
            }),
        }),
        register: builder.mutation<RegisterResponse, RegisterParams>({
            query: (body) => ({
                url: "auth/register",
                method: "POST",
                body,
            }),
        }),
        login: builder.mutation<LoginResponse, LoginParams>({
            query: (body) => ({
                url: "auth/login",
                method: "POST",
                body,
            }),
        }),
        getMe: builder.mutation<AuthMeResponse, void>({
            query: () => ({
                url: "auth/me",
                method: "GET",
            }),
        }),
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: "auth/logout",
                method: "POST",
            }),
        }),
    }),
});

export const {
    useSendCodeMutation,
    useVerifyCodeMutation,
    useLoginMutation,
    useRegisterMutation,
    useGetMeMutation,
    useLogoutMutation,
} = authApi;

export const authReducer = authApi.reducer;
export const authMiddleware = authApi.middleware;

// token trigger
const initialState = {
    tokenTrigger: 0,
};

export const tokenTriggerSlice = createSlice({
    name: "tokenTrigger",
    initialState,
    reducers: {
        setTokenTrigger: (state) => {
            state.tokenTrigger += 1;
        },
    },
});

export const { setTokenTrigger } = tokenTriggerSlice.actions;
export const tokenTriggerReducer = tokenTriggerSlice.reducer;

export const selectTokenTrigger = (state: RootState) =>
    state.tokenTrigger.tokenTrigger;
