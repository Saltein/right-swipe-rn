const CODE_REGEX = /^\d{6}$/;

export const validateCode = (code: string) => CODE_REGEX.test(code);