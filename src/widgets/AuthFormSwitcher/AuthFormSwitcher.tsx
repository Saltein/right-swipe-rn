import {
    View,
    StyleSheet,
    Pressable,
    Animated,
    LayoutChangeEvent,
} from "react-native";
import { DefaultText, styles } from "../../shared";
import { useState, useRef } from "react";
import { Form } from "../../processes/auth/ui/Form/Form";

export function AuthFormSwitcher() {
    const [fromLogin, setFromLogin] = useState(true);
    const [isSwitching, setIsSwitching] = useState(false); // флаг для блокировки onLayout во время анимации

    const indicatorAnim = useRef(new Animated.Value(0)).current;
    const heightAnim = useRef(new Animated.Value(0)).current;

    const loginHeight = useRef(0);
    const registerHeight = useRef(0);

    const [measured, setMeasured] = useState(false);

    const switchTab = (isLogin: boolean) => {
        setIsSwitching(true);
        setFromLogin(isLogin);

        Animated.parallel([
            Animated.timing(indicatorAnim, {
                toValue: isLogin ? 0 : 1,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.timing(heightAnim, {
                toValue: isLogin ? loginHeight.current : registerHeight.current,
                duration: 250,
                useNativeDriver: false,
            }),
        ]).start(() => setIsSwitching(false));
    };

    const indicatorLeft = indicatorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "50%"],
    });

    const onLoginLayout = (e: LayoutChangeEvent) => {
        loginHeight.current = e.nativeEvent.layout.height;
        if (registerHeight.current !== 0 && !measured) {
            heightAnim.setValue(loginHeight.current);
            setMeasured(true);
        }
    };

    const onRegisterLayout = (e: LayoutChangeEvent) => {
        registerHeight.current = e.nativeEvent.layout.height;
        if (loginHeight.current !== 0 && !measured) {
            heightAnim.setValue(loginHeight.current);
            setMeasured(true);
        }
    };

    // Обработчик изменения высоты активной формы
    const onActiveFormLayout = (e: LayoutChangeEvent) => {
        if (isSwitching) return; // не мешаем анимации переключения
        const newHeight = e.nativeEvent.layout.height;
        heightAnim.setValue(newHeight);
        // обновляем реф, чтобы при следующем переключении использовать актуальную высоту
        if (fromLogin) {
            loginHeight.current = newHeight;
        } else {
            registerHeight.current = newHeight;
        }
    };

    return (
        <View style={s.container}>
            <View style={s.switcher}>
                <Animated.View
                    style={[
                        s.indicator,
                        {
                            left: indicatorLeft,
                        },
                    ]}
                />

                <Pressable
                    style={s.switchButton}
                    onPress={() => switchTab(true)}
                >
                    <DefaultText style={s.buttonText}>Вход</DefaultText>
                </Pressable>

                <Pressable
                    style={s.switchButton}
                    onPress={() => switchTab(false)}
                >
                    <DefaultText style={s.buttonText}>Регистрация</DefaultText>
                </Pressable>
            </View>

            {measured && (
                <Animated.View
                    style={{
                        height: heightAnim,
                        overflow: "hidden",
                    }}
                >
                    {/* Оборачиваем форму в View с onLayout для отслеживания изменений высоты */}
                    <View onLayout={onActiveFormLayout}>
                        {fromLogin ? (
                            <Form key="login" type="login" />
                        ) : (
                            <Form key="register" type="register" />
                        )}
                    </View>
                </Animated.View>
            )}

            {!measured && (
                <View style={s.hiddenMeasure}>
                    <View onLayout={onLoginLayout}>
                        <Form type="login" />
                    </View>
                    <View onLayout={onRegisterLayout}>
                        <Form type="register" />
                    </View>
                </View>
            )}
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        backgroundColor: styles.colors.backgroundSurface,
        borderColor: styles.colors.border,
        borderWidth: 1,
        borderRadius: styles.radius.xxl,
        marginHorizontal: styles.spacing.md,
    },

    switcher: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: styles.colors.border,
        position: "relative",
    },

    switchButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: styles.heights.inputsAndButtons,
    },

    buttonText: {
        fontWeight: "600",
        fontSize: 16,
    },

    indicator: {
        position: "absolute",
        bottom: 0,
        width: "50%",
        height: 3,
        backgroundColor: styles.colors.primary,
    },

    hiddenMeasure: {
        position: "absolute",
        left: 0,
        right: 0, // занимаем всю ширину контейнера
        opacity: 0,
        pointerEvents: "none",
    },
});
