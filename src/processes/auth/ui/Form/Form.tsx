import { View, Text, StyleSheet } from "react-native";
import {
    DateInput,
    DefaultButton,
    DefaultTextInput,
    OptionInput,
    styles,
} from "../../../../shared";
import { useState } from "react";
import { validateEmail } from "../../../../shared/lib/validateEmail";
import { Option } from "../../../../shared/ui/OptionInput/OptionInput";

type FormType = "login" | "register";

interface FormProps {
    type: FormType;
}

export function Form({ type }: FormProps) {
    const [gender, setGender] = useState<Option | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthDate, setBirthDate] = useState<Date | null>(null);

    const [isCodeSent, setIsCodeSent] = useState(false);

    const allFieldsFilledRegister =
        gender !== null &&
        name !== "" &&
        email !== "" &&
        verifyCode !== "" &&
        city !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        birthDate !== null;

    const allFieldsFilledLogin = email !== "" && password !== "";

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
                        onChangeText={setPassword}
                    />
                    <DefaultButton
                        title="Войти"
                        onPress={() => {}}
                        inactive={allFieldsFilledLogin ? false : true}
                    />
                </>
            ) : (
                <>
                    <OptionInput
                        options={[
                            { id: 1, name: "Мужчина" },
                            { id: 2, name: "Женщина" },
                        ]}
                        value={gender}
                        onChange={setGender}
                    />

                    <DefaultTextInput
                        style={s.input}
                        placeholder="Имя"
                        value={name}
                        onChangeText={setName}
                    />
                    <DefaultTextInput
                        style={s.input}
                        placeholder="Электронная почта"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <View
                        style={{ flexDirection: "row", gap: styles.spacing.md }}
                    >
                        {isCodeSent && (
                            <DefaultTextInput
                                style={{ width: undefined, flex: 1 }}
                            ></DefaultTextInput>
                        )}
                        <DefaultButton
                            title="Получить проверочный код"
                            onPress={() => {}}
                            inactive={validateEmail(email) ? false : true}
                            style={{ width: undefined, flex: 1 }}
                        />
                    </View>

                    <DateInput
                        style={s.input}
                        value={birthDate}
                        onChange={setBirthDate}
                    />
                    <DefaultTextInput
                        style={s.input}
                        placeholder="Город"
                        value={city}
                        onChangeText={setCity}
                    />
                    <DefaultTextInput
                        style={s.input}
                        placeholder="Пароль"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <DefaultTextInput
                        style={s.input}
                        placeholder="Повторите пароль"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <DefaultButton
                        title="Зарегистрироваться"
                        onPress={() => {}}
                        inactive={allFieldsFilledRegister ? false : true}
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
