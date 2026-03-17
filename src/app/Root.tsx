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
import { PaperProvider } from "react-native-paper";
import { NoticeStack } from "../features/inAppNotice/ui/NoticeStack/NoticeStack";
import { selectTokenTrigger, useGetMeMutation } from "../api/authApiSlice";
import { AuthLoadingPage } from "../pages/AuthLoadingPage/AuthLoadingPage";

export function Root() {
    const { height } = useWindowDimensions();
    const [getMe, { data, isLoading }] = useGetMeMutation();
    const tokenTrigger = useSelector(selectTokenTrigger);

    useEffect(() => {
        getMe();
    }, [tokenTrigger]);

    if (isLoading) {
        return <AuthLoadingPage />;
    }

    const isAuth = !!data;

    return (
        <>
            <StatusBar style="light" />
            <SafeAreaView style={[s.container, { height }]}>
                <PaperProvider>
                    <NoticeStack />
                    <NavigationContainer>
                        <RootNavigator isAuth={isAuth} />
                    </NavigationContainer>
                </PaperProvider>
            </SafeAreaView>
        </>
    );
}

const s = StyleSheet.create({
    container: {
        backgroundColor: styles.colors.backgroundMain,
    },
});
