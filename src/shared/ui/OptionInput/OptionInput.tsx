import { StyleSheet, FlatList, Pressable, View } from "react-native";
import { styles } from "../../styles/styles";
import { DefaultText } from "../DefaultText/DefaultText";
import { current } from "@reduxjs/toolkit";

export type Option = {
    id: number;
    name: string;
};

interface OptionInputProps {
    options: Option[];
    value: Option | null;
    onChange: (option: Option) => void;
}

export function OptionInput({ options, value, onChange }: OptionInputProps) {
    return (
        <View style={s.container}>
            {options.map((option) => (
                <Pressable
                    style={[s.option, value?.id === option.id && s.current]}
                    key={option.id}
                    onPress={() => onChange(option)}
                >
                    <DefaultText>{option.name}</DefaultText>
                </Pressable>
            ))}
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        gap: styles.spacing.md,
    },
    option: {
        height: styles.heights.inputsAndButtons,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: styles.colors.backgroundItems,
        borderWidth: 1,
        borderColor: styles.colors.border,
        borderRadius: styles.radius.md,
    },
    current: {
        backgroundColor: styles.colors.primary,
    },
});
