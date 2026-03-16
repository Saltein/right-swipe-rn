import { View, StyleSheet } from "react-native";
import { DefaultButton, Skeleton, styles } from "../../../../../shared";
import { validateEmail } from "../../../../../shared/lib/validateEmail";
import { useVerifyCodeMutation } from "../../../../../api/authApiSlice";
import { useEffect } from "react";
import { validateCode } from "../../../../../shared/lib/validateCode";

interface VerifyCodeButtonProps {
    code: string;
    email: string;
    setIsCodeVerified: (siCodeVerified: boolean) => void;
    setError: (error: string) => void;
}

export function VerifyCodeButton({
    code,
    email,
    setIsCodeVerified,
    setError,
}: VerifyCodeButtonProps) {
    const [verifyCode, { isLoading, isSuccess, isError, error }] =
        useVerifyCodeMutation();

    function handleVerifyCode() {
        verifyCode({ email, code });
    }

    useEffect(() => {
        if (isSuccess) {
            setIsCodeVerified(true);
        }
        if (isError) {
            setIsCodeVerified(false);
            if (
                "data" in error &&
                typeof error.data === "object" &&
                error.data !== null
            ) {
                setError((error.data as { error: string }).error);
            } else {
                setError("Неизвестная ошибка");
            }
        }
    }, [isSuccess, isError]);

    return (
        <>
            <DefaultButton
                title={isLoading ? "Проверяем..." : "Проверить код"}
                onPress={handleVerifyCode}
                inactive={
                    !validateEmail(email) || !validateCode(code) || isLoading
                }
                style={s.button}
            />
            {isLoading && (
                <View style={s.loading}>
                    <Skeleton style={s.skeleton} />
                </View>
            )}
        </>
    );
}

const s = StyleSheet.create({
    button: {
        width: undefined,
        flex: 1,
    },
    loading: {
        position: "absolute",
        height: "100%",
        width: "100%",
    },
    skeleton: {
        borderRadius: styles.radius.md,
    },
});
