import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "./types";
import { DatingPage } from "../../../pages";

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="NoteRedactor"
                component={DatingPage}
                initialParams={{ isPublic: false }}
            />
        </Stack.Navigator>
    );
}
