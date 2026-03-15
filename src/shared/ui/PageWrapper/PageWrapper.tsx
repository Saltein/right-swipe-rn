import { View, Text, StyleSheet } from "react-native";
import { ViewProps } from "react-native";
import { styles } from "../../styles/styles";

export function PageWrapper({ style, ...props }: ViewProps) {
    return <View style={[s.wrapper, style]}>{props.children}</View>;
}

const s = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: styles.colors.backgroundMain,
    },
});
