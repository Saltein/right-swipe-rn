import { View, StyleSheet, Pressable } from "react-native";
import { ViewProps } from "react-native";
import { styles } from "../../styles/styles";
import { Portal } from "react-native-paper";
import { useKeyboardDidShow } from "../../hooks/useKeyboardDidShow";

interface ModalWrapperProps extends ViewProps {
    onClose: () => void;
}

export function ModalWrapper({ onClose, style, ...props }: ModalWrapperProps) {
    const { keyboardVisible, keyboardHeight } = useKeyboardDidShow();
    return (
        <Portal>
            <Pressable onPress={onClose} style={[s.wrapper, keyboardVisible && { marginBottom: keyboardHeight }]}>
                <View style={[s.modal, style]}>{props.children}</View>
            </Pressable>
        </Portal>
    );
}

const s = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: styles.colors.backgroundOutsideModal,
    },
    modal: {
        backgroundColor: styles.colors.backgroundSurface,
        borderRadius: styles.radius.xxl,
        borderWidth: 1,
        borderColor: styles.colors.border,
        padding: styles.spacing.md,
    },
});
