import { View, StyleSheet } from "react-native";
import { DefaultButton, Skeleton, styles } from "../../../../../shared";
import { validateEmail } from "../../../../../shared/lib/validateEmail";
import { useSendCodeMutation } from "../../../../../api/authApiSlice";
import { useEffect } from "react";

interface SendCodeButtonProps {
    email: string;
    setIsCodeSent: (isCodeSent: boolean) => void;
    setError: (error: string) => void;
}

export function SendCodeButton({
    email,
    setIsCodeSent,
    setError,
}: SendCodeButtonProps) {
    const [sendCode, { isLoading, isSuccess, isError, error }] =
        useSendCodeMutation();

    function handleSendCode() {
        sendCode({ email });
    }

    useEffect(() => {
        if (isSuccess) {
            setIsCodeSent(true);
        }
        if (isError) {
            setIsCodeSent(false);
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
                title={isLoading ? "Отправляем..." : "Получить проверочный код"}
                onPress={handleSendCode}
                inactive={!validateEmail(email) || isLoading}
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
