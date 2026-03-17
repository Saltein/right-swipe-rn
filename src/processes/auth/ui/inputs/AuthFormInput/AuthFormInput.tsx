import { StyleSheet, TextInputProps } from "react-native";
import { DefaultTextInput, styles } from "../../../../../shared";

interface AuthFormInputProps extends TextInputProps {}

export function AuthFormInput({
    value,
    onChangeText,
    placeholder,
    style,
    autoCapitalize,
    ...props
}: AuthFormInputProps) {
    return (
        <DefaultTextInput
            style={[s.input, style]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            maxLength={50}
            autoCorrect={false}
            autoCapitalize={autoCapitalize ? autoCapitalize : "none"}
            {...props}
        />
    );
}

const s = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: styles.colors.border,
        borderRadius: styles.radius.md,
    },
});
