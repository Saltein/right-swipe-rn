import { Pressable, StyleSheet } from "react-native";
import { DefaultText } from "../DefaultText/DefaultText";
import { styles } from "../../styles/styles";

interface DefaultButtonProps {
    onPress: () => void;
    title: string;
    inactive?: boolean;
}

export function DefaultButton({
    onPress,
    title,
    inactive,
}: DefaultButtonProps) {
    return (
        <Pressable onPress={onPress} style={[s.button, inactive && s.inactive]}>
            <DefaultText style={s.buttonText}>{title}</DefaultText>
        </Pressable>
    );
}

const s = StyleSheet.create({
    button: {
        backgroundColor: styles.colors.primary,
        height: styles.heights.inputsAndButtons,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: styles.radius.md,
        borderColor: styles.colors.border,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 600,
    },

    inactive: {
        backgroundColor: styles.colors.disabled,
    },
});
