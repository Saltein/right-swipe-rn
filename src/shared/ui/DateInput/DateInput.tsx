import { useState } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { DefaultText } from "../DefaultText/DefaultText";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../../styles/styles";

interface DateInputProps {
    value: Date | null;
    onChange: (date: Date) => void;
    style?: StyleProp<ViewStyle>;
}

export function DateInput({ value, onChange, style }: DateInputProps) {
    const [isOpen, setIsOpen] = useState(false);

    const onDateChange = (event: any, selectedDate?: Date) => {
        setIsOpen(false);

        if (selectedDate) {
            const normalizedDate = new Date(selectedDate);
            normalizedDate.setHours(0, 0, 0, 0);

            onChange(normalizedDate);
        }
    };

    return (
        <>
            <Pressable
                style={[s.container, style ? style : null]}
                onPress={() => setIsOpen(true)}
            >
                <DefaultText
                    style={{
                        color: value
                            ? styles.colors.text
                            : styles.colors.textPlaceholder,
                    }}
                >
                    {value ? value.toLocaleDateString("ru") : "Дата рождения"}
                </DefaultText>
            </Pressable>
            {isOpen && (
                <DateTimePicker
                    value={value ?? new Date()}
                    onChange={onDateChange}
                    mode="date"
                    display="default"
                />
            )}
        </>
    );
}

const s = StyleSheet.create({
    container: {
        width: "100%",
        height: styles.heights.inputsAndButtons,
        includeFontPadding: false,
        color: styles.colors.text,
        paddingHorizontal: styles.spacing.lg,
        justifyContent: "center",
    },
});
