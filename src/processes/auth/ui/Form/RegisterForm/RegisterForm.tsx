import { View, Pressable, Keyboard, StyleSheet } from "react-native";
import {
    DateInput,
    DefaultText,
    ModalWrapper,
    OptionFlatListInput,
    OptionInput,
    styles,
} from "../../../../../shared";
import { AuthFormInput } from "../../inputs/AuthFormInput/AuthFormInput";
import { VerifyCodeButton } from "../../buttons/VerifyCodeButton/VerifyCodeButton";
import { SendCodeButton } from "../../buttons/SendCodeButton/SendCodeButton";
import { RegisterButton } from "../../buttons/RegisterButton/RegisterButton";
import { Option } from "../../../../../shared/ui/OptionInput/OptionInput";
import { useEffect, useState } from "react";
import { cityNames } from "../../../../../shared/consts/russianCities";

interface RegisterFormProps {
    setLoginMode?: () => void;
}

export default function RegisterForm({
    setLoginMode,
}: RegisterFormProps) {
    const maxLength = 6;
    const letterSpacing = 10;
    const fontSize = 14;

    const charWidth = fontSize;
    const inputWidth = maxLength * charWidth + (maxLength - 1) * letterSpacing;

    const [codeError, setCodeError] = useState("");
    const [error, setError] = useState("");

    const [gender, setGender] = useState<Option | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [city, setCity] = useState("");

    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setError("");
    }, [gender, name, email, password, confirmPassword, birthDate, city]);

    useEffect(() => {
        setCodeError("");
    }, [verifyCode, isCodeVerified, isCodeSent]);

    useEffect(() => {
        setError("");
    }, [gender, name, email, password, confirmPassword, birthDate, city]);

    useEffect(() => {
        setIsCodeSent(false);
        setIsCodeVerified(false);
        setVerifyCode("");
    }, [email]);

    return (
        <>
            <OptionInput
                options={[
                    { id: 1, name: "Мужчина" },
                    { id: 2, name: "Женщина" },
                ]}
                value={gender}
                onChange={setGender}
            />

            <AuthFormInput
                placeholder="Имя"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
            />
            <AuthFormInput
                placeholder="Электронная почта"
                value={email}
                onChangeText={setEmail}
            />

            <View style={{ flexDirection: "row", gap: styles.spacing.md }}>
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
                        <AuthFormInput
                            maxLength={6}
                            style={{
                                width: inputWidth,
                                letterSpacing: letterSpacing,
                            }}
                            keyboardType="numeric"
                            value={verifyCode}
                            onChangeText={(code) => {
                                const numericCode = code.replace(/[^0-9]/g, "");
                                setVerifyCode(numericCode);
                            }}
                            placeholder="000000"
                        />
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
            <Pressable
                style={s.input}
                onPress={() => {
                    setShowModal(true);
                    Keyboard.dismiss();
                }}
            >
                <DefaultText
                    style={{
                        height: styles.heights.inputsAndButtons,
                        textAlignVertical: "center",
                        paddingHorizontal: styles.spacing.lg,
                        color: city
                            ? styles.colors.text
                            : styles.colors.textPlaceholder,
                    }}
                >
                    {city ? city : "Город"}
                </DefaultText>
            </Pressable>
            <AuthFormInput
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <AuthFormInput
                placeholder="Повторите пароль"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
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

            <RegisterButton
                setLoginMode={setLoginMode}
                formData={{
                    first_name: name,
                    email,
                    password,
                    passwordCheck: confirmPassword,
                    city,
                    dateOfBirth:
                        birthDate?.toLocaleDateString("sv-SE") ??
                        new Date().toLocaleDateString("sv-SE"),
                    gender: gender ? (gender.id === 1 ? "M" : "F") : undefined,
                }}
                isCodeVerified={isCodeVerified}
                confirmPassword={confirmPassword}
                setError={setError}
            />
            {showModal && (
                <ModalWrapper
                    style={{ width: "90%", height: 400 }}
                    onClose={() => setShowModal(false)}
                >
                    <OptionFlatListInput
                        title="Выберите свой город"
                        setOption={setCity}
                        setShowModal={setShowModal}
                        searchable
                        list={cityNames}
                    />
                </ModalWrapper>
            )}
        </>
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
