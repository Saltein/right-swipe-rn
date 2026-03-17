import { useEffect, useState } from "react";
import { View } from "react-native";
import { DefaultText, styles } from "../../shared";

export function AuthLoadingPage() {
    const [loadingDots, setLoadingDots] = useState(".");

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingDots((prev) => prev + ".");
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (loadingDots.length > 3) setLoadingDots(".");
    }, [loadingDots]);

    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                backgroundColor: styles.colors.backgroundMain,
            }}
        >
            <View
                style={{
                    borderLeftColor: styles.colors.text,
                    borderLeftWidth: 3,
                    paddingLeft: styles.spacing.sm,
                }}
            >
                <DefaultText style={{ fontSize: 24, lineHeight: 24 }}>
                    Right Swipe
                </DefaultText>
                <DefaultText
                    style={{ fontSize: 16, lineHeight: 16, marginBottom: 2 }}
                >
                    Загрузка{loadingDots}
                </DefaultText>
            </View>
        </View>
    );
}
