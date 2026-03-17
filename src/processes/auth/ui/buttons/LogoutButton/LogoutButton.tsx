import { View, StyleSheet } from "react-native";
import { DefaultButton, Skeleton, styles } from "../../../../../shared";
import {
    setTokenTrigger,
    useLogoutMutation,
} from "../../../../../api/authApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNotice } from "../../../../../features/inAppNotice/model/inAppNoticeSlice";
import { generateRandomIdString } from "../../../../../shared/lib/generateRandomIdString";
import { tokenStorage } from "../../../../../app/storage";

interface LogoutButtonProps {}

export function LogoutButton({}: LogoutButtonProps) {
    const dispatch = useDispatch();

    const [logout, { isLoading, isSuccess, isError, error }] =
        useLogoutMutation();

    async function handleLogout() {
        logout();
        dispatch(setTokenTrigger());
        await tokenStorage.removeToken();
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(
                addNotice({
                    id: generateRandomIdString(),
                    type: "success",
                    content: "Вы вышли из аккаунта",
                }),
            );
        }
        if (isError) {
            console.log("error", error);
            if (
                "data" in error &&
                typeof error.data === "object" &&
                error.data !== null
            ) {
                dispatch(
                    addNotice({
                        id: generateRandomIdString(),
                        type: "error",
                        content: (error.data as { error: string }).error,
                    }),
                );
            } else {
                dispatch(
                    addNotice({
                        id: generateRandomIdString(),
                        type: "error",
                        content: "Неизвестная ошибка",
                    }),
                );
            }
        }
    }, [isSuccess, isError]);

    return (
        <>
            <DefaultButton
                title={isLoading ? "Выход..." : "Выйти из аккаунта"}
                onPress={handleLogout}
                inactive={isLoading}
                style={s.button}
            />
            {isLoading && (
                <View style={s.loading}>
                    <Skeleton style={s.skeleton} />
                </View>
            )}
        </>
    );
}

const s = StyleSheet.create({
    button: {
        width: "100%",
    },
    loading: {
        position: "absolute",
        height: "100%",
        width: "100%",
    },
    skeleton: {
        borderRadius: styles.radius.md,
    },
});
