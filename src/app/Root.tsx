import { useWindowDimensions, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
// import { AuthLoadingScreen } from "../features/auth/ui/AuthLoadingScreen/AuthLoadingScreen";
// import {
//     selectTokenTrigger,
//     useGetMeMutation,
// } from "../features/auth/model/authApiSlice";
import { RootNavigator } from "./providers/navigation/RootNavigator";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { styles } from "../shared";

export function Root() {
    const { height } = useWindowDimensions();
    // const [getMe, { data, isLoading }] = useGetMeMutation();
    // const tokenTrigger = useSelector(selectTokenTrigger);

    // useEffect(() => {
    //     getMe();
    // }, [tokenTrigger]);

    // if (isLoading) {
    //     // return <AuthLoadingScreen />;
    // }

    // const isAuth = !!data;

    return (
        <>
            <StatusBar style="auto" />
            <SafeAreaView style={[s.container, { height }]}>
                <NavigationContainer>
                    <RootNavigator isAuth={false} />
                </NavigationContainer>
            </SafeAreaView>
        </>
    );
}

const s = StyleSheet.create({
    container: {
        backgroundColor: styles.colors.backgroundMain,
    },
});
