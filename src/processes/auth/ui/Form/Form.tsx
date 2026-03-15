import { View, Text, StyleSheet } from "react-native";
import { DefaultButton, DefaultTextInput, styles } from "../../../../shared";
import { useState } from "react";

type FormType = "login" | "register";

interface FormProps {
    type: FormType;
}

export function Form({ type }: FormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <View style={s.container}>
            {type === "login" ? (
                <>
                    <DefaultTextInput
                        style={s.input}
                        placeholder="Электронная почта"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <DefaultTextInput
                        style={s.input}
                        placeholder="Пароль"
                        value={password}
                    />
                    <DefaultButton title="Войти" onPress={() => {}} />
                </>
            ) : (
                <>
                    <DefaultTextInput style={s.input} placeholder="Имя" />
                    <DefaultTextInput
                        style={s.input}
                        placeholder="Электронная почта"
                    />
                    <DefaultButton
                        title="Получить проверочный код"
                        onPress={() => {}}
                    />
                    <DefaultTextInput
                        style={s.input}
                        placeholder="Дата рождения"
                    />
                    <DefaultTextInput style={s.input} placeholder="Город" />
                    <DefaultTextInput style={s.input} placeholder="Пароль" />
                    <DefaultTextInput
                        style={s.input}
                        placeholder="Повторите пароль"
                    />
                    <DefaultButton
                        title="Зарегистрироваться"
                        onPress={() => {}}
                    />
                </>
            )}
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        gap: styles.spacing.md,
        padding: styles.spacing.md,
    },

    input: {
        borderWidth: 1,
        borderColor: styles.colors.border,
        borderRadius: styles.radius.md,
    },
});
