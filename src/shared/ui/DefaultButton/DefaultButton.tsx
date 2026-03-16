import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { DefaultText } from "../DefaultText/DefaultText";
import { styles } from "../../styles/styles";

interface DefaultButtonProps {
    onPress: () => void;
    title: string;
    inactive?: boolean;
    style?: StyleProp<ViewStyle>;
}

export function DefaultButton({
    onPress,
    title,
    inactive,
    style,
}: DefaultButtonProps) {
    return (
        <Pressable
            onPress={inactive ? () => {} : onPress}
            style={[s.button, inactive && s.inactive, style]}
        >
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
