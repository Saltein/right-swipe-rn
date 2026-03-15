import { AuthNavigator } from "./AuthNavigator";
import { AppNavigator } from "./AppNavigator";

export function RootNavigator({ isAuth }: { isAuth: boolean }) {
    if (!isAuth) {
        return <AuthNavigator />;
    }

    return <AppNavigator />;
}