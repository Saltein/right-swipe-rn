import { ScrollView, StyleSheet } from "react-native";
import { PageWrapper, styles, useKeyboardDidShow } from "../../shared";
import { AuthFormSwitcher } from "../../widgets/AuthFormSwitcher/AuthFormSwitcher";

export function AuthPage() {
    const { keyboardVisible, keyboardHeight } = useKeyboardDidShow();

    return (
        <PageWrapper
            style={{
                paddingBottom: keyboardVisible ? keyboardHeight : 0,
                justifyContent: "center",
            }}
        >
            <ScrollView
                contentContainerStyle={s.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <AuthFormSwitcher />
            </ScrollView>
        </PageWrapper>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styles.colors.backgroundMain,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: styles.spacing.md,
    },
});
