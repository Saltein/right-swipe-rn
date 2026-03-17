import { View, StyleSheet } from "react-native";
import { styles } from "../../../../shared";
import { LoginForm } from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

type FormType = "login" | "register";

interface FormProps {
    type: FormType;
    setLoginMode?: () => void;
}

export function Form({ type, setLoginMode }: FormProps) {
    const secureEntry = true;

    return (
        <View style={s.container}>
            {type === "login" ? (
                <LoginForm secureEntry={secureEntry} />
            ) : (
                <RegisterForm setLoginMode={setLoginMode} />
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
