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
    city: string;
    dateOfBirth: string; // ISO строка даты "YYYY-MM-DD"
    gender?: "M" | "F" | undefined;
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

// authMe
export interface AuthMeResponse {
    user: {
        id: number;
        email: string;
        first_name: string;
        city: string | null;
        birth_date: string | null;
        gender: string | null;
        verified: boolean;
    };
}

// logout
export interface LogoutResponse {
    message: string;
}

// errors
export interface ErrorResponse {
    error: string;
}
