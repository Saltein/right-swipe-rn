import { StyleSheet, Text, TextProps } from "react-native";
import { styles } from "../../styles/styles";

export const DefaultText = ({ style, ...props }: TextProps) => {
    return (
        <Text {...props} style={[s.text, style]}>
            {props.children}
        </Text>
    );
};

const s = StyleSheet.create({
    text: {
        color: styles.colors.text,
    },
});
