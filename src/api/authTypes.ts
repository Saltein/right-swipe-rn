// send-code
export interface SendCodeParams {
    email: string;
}

export interface SendCodeResponse {
    message: string;
}

// verify-code
export interface VerifyCodeParams {
    email: string;
    code: string;
}

export interface VerifyCodeResponse {
    message: string;
}

// register
export interface RegisterParams {
    first_name: string;
    email: string;
    password: string;
    passwordCheck: string;
    city?: string | null;
    dateOfBirth?: string | null; // ISO строка даты "YYYY-MM-DD"
    gender?: "M" | "F";
}

export interface RegisterResponse {
    message: string;
}

// login
export interface LoginParams {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

// errors
export interface ErrorResponse {
    error: string;
}
