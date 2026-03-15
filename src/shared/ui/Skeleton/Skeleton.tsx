import React, { useEffect, useRef } from "react";
import { View, StyleProp, ViewStyle, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface SkeletonProps {
    style?: StyleProp<ViewStyle>;
}

export const Skeleton: React.FC<SkeletonProps> = ({ style }) => {
    const translateX = useRef(new Animated.Value(-1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
        ).start();
    }, []);

    const animatedStyle = {
        transform: [
            {
                translateX: translateX.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-300, 300],
                }),
            },
        ],
    };

    return (
        <View
            style={[
                s.container,
                style,
            ]}
        >
            <Animated.View style={[s.gradientWrapper, animatedStyle]}>
                <LinearGradient
                    colors={["#fff0", "#fff9", "#fff0"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={s.gradient}
                />
            </Animated.View>
        </View>
    );
};

const s = StyleSheet.create({
    container: {
        overflow: "hidden",
        borderRadius: 8,
        height: "100%",
        width: "100%",
    },
    gradientWrapper: StyleSheet.absoluteFill,
    gradient: {
        flex: 1,
        width: "100%",
    },
});
