import { View, StyleSheet, Pressable, FlatList, Keyboard } from "react-native";
import {
    DateInput,
    DefaultButton,
    DefaultText,
    DefaultTextInput,
    ModalWrapper,
    OptionFlatListInput,
    OptionInput,
    styles,
} from "../../../../shared";
import { useEffect, useState } from "react";
import { Option } from "../../../../shared/ui/OptionInput/OptionInput";
import { SendCodeButton } from "../buttons/SendCodeButton/SendCodeButton";
import { VerifyCodeButton } from "../buttons/VerifyCodeButton/VerifyCodeButton";
import { RegisterButton } from "../buttons/RegisterButton/RegisterButton";
import { cityNames } from "../../../../shared/consts/russianCities";

type FormType = "login" | "register";

interface FormProps {
    type: FormType;
    setLoginMode?: () => void;
}

export function Form({ type, setLoginMode }: FormProps) {
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

    const [showModal, setShowModal] = useState(false);

    const allFieldsFilledLogin = email !== "" && password !== "";

    const maxLength = 6;
    const letterSpacing = 10;
    const fontSize = 14;

    const charWidth = fontSize;
    const inputWidth = maxLength * charWidth + (maxLength - 1) * letterSpacing;

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
                            gender: gender
                                ? gender.id === 1
                                    ? "M"
                                    : "F"
                                : undefined,
                        }}
                        isCodeVerified={isCodeVerified}
                        confirmPassword={confirmPassword}
                        setError={setError}
                    />
                </>
            )}
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
