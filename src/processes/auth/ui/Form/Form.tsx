import { View, StyleSheet } from "react-native";
import {
    DateInput,
    DefaultButton,
    DefaultText,
    DefaultTextInput,
    OptionInput,
    styles,
} from "../../../../shared";
import { useEffect, useState } from "react";
import { Option } from "../../../../shared/ui/OptionInput/OptionInput";
import { SendCodeButton } from "../buttons/SendCodeButton/SendCodeButton";
import { VerifyCodeButton } from "../buttons/VerifyCodeButton/VerifyCodeButton";

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
    const [isCodeVerified, setIsCodeVerified] = useState(false);

    const [codeError, setCodeError] = useState("");
    const [error, setError] = useState("");

    const allFieldsFilledRegister =
        gender !== null &&
        name !== "" &&
        email !== "" &&
        isCodeVerified &&
        city !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        birthDate !== null;

    const allFieldsFilledLogin = email !== "" && password !== "";

    const maxLength = 6;
    const letterSpacing = 10;
    const fontSize = 14;

    const charWidth = fontSize;
    const inputWidth = maxLength * charWidth + (maxLength - 1) * letterSpacing;

    useEffect(() => {
        setCodeError("");
    }, [verifyCode]);

    useEffect(() => {
        setError("");
    }, [gender, name, email, password, confirmPassword, birthDate, city]);

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
                        {isCodeVerified ? (
                            <View
                                style={{
                                    width: "100%",
                                }}
                            >
                                <DefaultText
                                    style={{
                                        color: styles.colors.success,
                                        alignSelf: "center",
                                    }}
                                >
                                    Email подтвержден!
                                </DefaultText>
                            </View>
                        ) : isCodeSent ? (
                            <>
                                <DefaultTextInput
                                    maxLength={6}
                                    style={[
                                        s.input,
                                        {
                                            width: inputWidth,
                                            letterSpacing: letterSpacing,
                                        },
                                    ]}
                                    keyboardType="numeric"
                                    value={verifyCode}
                                    onChangeText={(code) => {
                                        const numericCode = code.replace(
                                            /[^0-9]/g,
                                            "",
                                        );
                                        setVerifyCode(numericCode);
                                    }}
                                    placeholder="000000"
                                ></DefaultTextInput>
                                <VerifyCodeButton
                                    code={verifyCode}
                                    email={email}
                                    setIsCodeVerified={setIsCodeVerified}
                                    setError={setCodeError}
                                />
                            </>
                        ) : (
                            <SendCodeButton
                                email={email}
                                setIsCodeSent={setIsCodeSent}
                                setError={setCodeError}
                            />
                        )}
                    </View>

                    {codeError && (
                        <DefaultText
                            style={{
                                color: styles.colors.error,
                                alignSelf: "center",
                            }}
                        >
                            {codeError}
                        </DefaultText>
                    )}

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
