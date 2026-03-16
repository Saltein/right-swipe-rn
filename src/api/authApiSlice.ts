import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../shared/consts/consts";
import {
    LoginParams,
    LoginResponse,
    RegisterParams,
    RegisterResponse,
    SendCodeParams,
    SendCodeResponse,
    VerifyCodeParams,
    VerifyCodeResponse,
} from "./authTypes";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    // prepareHeaders: async (headers) => {
    //     const token = await tokenStorage.getToken();
    //     if (token) {
    //         headers.set("Authorization", `Bearer ${token}`);
    //     }
    //     headers.set("X-Client-Type", "mobile");

    //     return headers;
    // },
});

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (builder) => ({
        sendCode: builder.mutation<SendCodeResponse, SendCodeParams>({
            query: (body) => ({
                url: `/auth/send-code`,
                method: "POST",
                body,
            }),
        }),
        verifyCode: builder.mutation<VerifyCodeResponse, VerifyCodeParams>({
            query: (body) => ({
                url: `/auth/verify-code`,
                method: "POST",
                body,
            }),
        }),
        register: builder.mutation<RegisterResponse, RegisterParams>({
            query: (body) => ({
                url: "register",
                method: "POST",
                body,
            }),
        }),
        login: builder.mutation<LoginResponse, LoginParams>({
            query: (body) => ({
                url: "login",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useSendCodeMutation,
    useVerifyCodeMutation,
    useLoginMutation,
    useRegisterMutation,
} = authApi;

export const authReducer = authApi.reducer;
export const authMiddleware = authApi.middleware;
