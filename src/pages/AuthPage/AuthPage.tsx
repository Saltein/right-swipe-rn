import { PageWrapper, useKeyboardDidShow } from "../../shared";
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
            <AuthFormSwitcher />
        </PageWrapper>
    );
}
