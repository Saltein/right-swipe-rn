import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthPage } from "../../../pages";

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthPage} />
        </Stack.Navigator>
    );
}
