import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { styles } from "../../styles/styles";
import { forwardRef, useState } from "react";

export const DefaultTextInput = forwardRef<TextInput, TextInputProps>(
    ({ style, onFocus, onBlur, ...props }, ref) => {
        const [focused, setFocused] = useState(false);

        return (
            <TextInput
                ref={ref}
                style={[s.input, style, focused ? s.focused : null]}
                {...props}
                placeholderTextColor={
                    props.placeholderTextColor || styles.colors.textPlaceholder
                }
                onFocus={(e) => {
                    setFocused(true);
                    onFocus?.(e);
                }}
                onBlur={(e) => {
                    setFocused(false);
                    onBlur?.(e);
                }}
            />
        );
    },
);

const s = StyleSheet.create({
    input: {
        width: "100%",
        height: styles.heights.inputsAndButtons,
        includeFontPadding: false,
        color: styles.colors.text,
        paddingHorizontal: styles.spacing.lg,
    },
    focused: {
        borderColor: styles.colors.primary,
    },
});
