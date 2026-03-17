import { View, StyleSheet } from "react-native";
import { DefaultButton, Skeleton, styles } from "../../../../../shared";
import { useRegisterMutation } from "../../../../../api/authApiSlice";
import { useEffect } from "react";
import { RegisterParams } from "../../../../../api/authTypes";
import { validateEmail } from "../../../../../shared/lib/validateEmail";
import { useDispatch } from "react-redux";
import { addNotice } from "../../../../../features/inAppNotice/model/inAppNoticeSlice";
import { generateRandomIdString } from "../../../../../shared/lib/generateRandomIdString";

interface RegisterButtonProps {
    setLoginMode?: () => void;
    formData: RegisterParams;
    isCodeVerified: boolean;
    confirmPassword: string;
    setError: (error: string) => void;
}

export function RegisterButton({
    formData,
    isCodeVerified,
    confirmPassword,
    setError,
    setLoginMode,
}: RegisterButtonProps) {
    const dispatch = useDispatch();

    const allFieldsFilledRegister =
        formData.gender !== undefined &&
        formData.first_name !== "" &&
        formData.email !== "" &&
        confirmPassword !== "" &&
        formData.city !== "" &&
        formData.password !== "" &&
        formData.dateOfBirth !== null;

    const [register, { isLoading, isSuccess, isError, error }] =
        useRegisterMutation();

    function handleRegister() {
        if (!allFieldsFilledRegister) {
            setError("Заполните все поля");
            return;
        }
        if (formData.first_name.trim().length < 2) {
            setError("Имя слишком короткое");
            return;
        }
        if (!validateEmail(formData.email)) {
            setError("Некорректный email");
            return;
        }
        if (formData.password.length < 8) {
            setError("Пароль должен содержать минимум 8 символов");
            return;
        }
        if (formData.password.includes(" ")) {
            setError("Пароль не должен содержать пробелы");
            return;
        }
        if (confirmPassword !== formData.password) {
            setError("Пароли не совпадают");
            return;
        }
        if (!formData.dateOfBirth) {
            setError("Укажите дату рождения");
            return;
        }
        const today = new Date();
        const birth = new Date(formData.dateOfBirth);

        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        if (age < 18) {
            setError("Вам должно быть не менее 18 лет");
            return;
        }
        if (!isCodeVerified) {
            setError("Подтвердите email");
            return;
        }

        const cleanData = {
            ...formData,
            first_name: formData.first_name.trim(),
            email: formData.email.trim().toLowerCase(),
        };

        register(cleanData);
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(
                addNotice({
                    id: generateRandomIdString(),
                    type: "success",
                    content: "Регистрация прошла успешно",
                }),
            );

            if (setLoginMode) {
                setLoginMode();
            }
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
                title={isLoading ? "Регистрируем..." : "Зарегистрироваться"}
                onPress={handleRegister}
                inactive={isLoading}
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
