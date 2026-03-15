import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export function useKeyboardDidShow() {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const showSub = Keyboard.addListener("keyboardDidShow", (event) => {
            setKeyboardVisible(true);
            setKeyboardHeight(event.endCoordinates.height);
        });

        const hideSub = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
            setKeyboardHeight(0);
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    return { keyboardVisible, keyboardHeight };
}
