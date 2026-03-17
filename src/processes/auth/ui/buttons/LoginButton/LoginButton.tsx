import { View, StyleSheet } from "react-native";
import { DefaultButton, Skeleton, styles } from "../../../../../shared";
import { setTokenTrigger, useLoginMutation } from "../../../../../api/authApiSlice";
import { useEffect } from "react";
import { LoginParams } from "../../../../../api/authTypes";
import { validateEmail } from "../../../../../shared/lib/validateEmail";
import { useDispatch } from "react-redux";
import { addNotice } from "../../../../../features/inAppNotice/model/inAppNoticeSlice";
import { generateRandomIdString } from "../../../../../shared/lib/generateRandomIdString";
import { tokenStorage } from "../../../../../app/storage";

interface LoginButtonProps {
    formData: LoginParams;
    setError: (error: string) => void;
}

export function LoginButton({ formData, setError }: LoginButtonProps) {
    const dispatch = useDispatch();

    const allFieldsFilledLogin =
        formData.email !== "" && formData.password !== "";

    const [login, { data, isLoading, isSuccess, isError, error }] =
        useLoginMutation();

    function handleLogin() {
        if (!allFieldsFilledLogin) {
            setError("Заполните все поля");
            return;
        }
        if (!validateEmail(formData.email)) {
            setError("Некорректный email");
            return;
        }
        if (formData.password.includes(" ")) {
            setError("Пароль не должен содержать пробелы");
            return;
        }
        if (formData.password.length < 8) {
            setError("Пароль должен содержать минимум 8 символов");
            return;
        }

        const cleanData = {
            email: formData.email.toLocaleLowerCase().trim(),
            password: formData.password,
        };

        login(cleanData);
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(
                addNotice({
                    id: generateRandomIdString(),
                    type: "success",
                    content: "Вы успешно вошли!",
                }),
            );
        }
        if (data) {
            tokenStorage.setToken(data.token);
            dispatch(setTokenTrigger());
        }
        if (isError) {
            console.log("error", error);
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
                title={isLoading ? "Вход..." : "Войти"}
                onPress={handleLogin}
                inactive={allFieldsFilledLogin ? false : true || isLoading}
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
        width: "100%",
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
