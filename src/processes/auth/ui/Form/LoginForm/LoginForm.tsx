import { AuthFormInput } from "../../inputs/AuthFormInput/AuthFormInput";
import { DefaultText, styles } from "../../../../../shared";
import { LoginButton } from "../../buttons/LoginButton/LoginButton";
import { useEffect, useState } from "react";

interface LoginFormProps {
    secureEntry: boolean;
}

export function LoginForm({ secureEntry }: LoginFormProps) {
    const [error, setError] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setError("");
    }, [email, password]);
    return (
        <>
            <AuthFormInput
                value={email}
                onChangeText={setEmail}
                placeholder="Электронная почта"
            />
            <AuthFormInput
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureEntry}
            />
            {error && (
                <DefaultText
                    style={{
                        color: styles.colors.error,
                        alignSelf: "center",
                    }}
                >
                    {error}
                </DefaultText>
            )}
            <LoginButton formData={{ email, password }} setError={setError} />
        </>
    );
}
