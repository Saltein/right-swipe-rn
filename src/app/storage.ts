import * as SecureStore from "expo-secure-store";

export const tokenStorage = {
    setToken: (token: string) => SecureStore.setItemAsync("accessToken", token),
    getToken: () => SecureStore.getItemAsync("accessToken"),
    removeToken: () => SecureStore.deleteItemAsync("accessToken"),
};
