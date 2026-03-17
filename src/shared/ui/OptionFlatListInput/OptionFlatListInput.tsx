import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { DefaultText } from "../DefaultText/DefaultText";
import { DefaultTextInput } from "../DefaultTextInput/DefaultTextInput";
import { useMemo, useState } from "react";
import { styles } from "../../styles/styles";
import SearchIcon from "../../assets/icons/search.svg";
import ClearIcon from "../../assets/icons/xmark.svg";
import { Keyboard } from "react-native";

interface OptionFlatListInputProps {
    setOption: (city: string) => void;
    setShowModal?: (showModal: boolean) => void;
    title: string;
    searchable?: boolean;
    list: string[];
}

export function OptionFlatListInput({
    setOption,
    setShowModal,
    title,
    searchable,
    list,
}: OptionFlatListInputProps) {
    const [searchQuery, setSearchQuery] = useState("");

    function handleOptionPress(option: string) {
        Keyboard.dismiss();
        setOption(option);
        if (!setShowModal) return;
        setShowModal(false);
    }

    let filteredList = useMemo(
        () =>
            list.filter((item) => {
                return item
                    .split("/")[0]
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            }),
        [list, searchQuery],
    );

    return (
        <>
            {searchable ? (
                <View style={s.inputView}>
                    <View style={[s.iconWrapper]}>
                        <SearchIcon
                            height={20}
                            width={20}
                            color={styles.colors.text}
                        />
                    </View>
                    <DefaultTextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={s.input}
                    />
                    <Pressable
                        style={[s.iconWrapper, { right: 0 }]}
                        onPress={() => setSearchQuery("")}
                    >
                        <ClearIcon
                            height={20}
                            width={20}
                            color={styles.colors.text}
                        />
                    </Pressable>
                </View>
            ) : (
                <DefaultText>{title}</DefaultText>
            )}
            <FlatList
                keyboardShouldPersistTaps="handled"
                data={filteredList}
                renderItem={({ item }) => (
                    <Pressable
                        style={s.option}
                        onPress={() => handleOptionPress(item.split("/")[0])}
                    >
                        <DefaultText
                            style={s.optionText}
                        >{`${item.split("/")[0]} ${item.split("/")[1]}`}</DefaultText>
                    </Pressable>
                )}
                keyExtractor={(item) => item}
            />
        </>
    );
}

const s = StyleSheet.create({
    inputView: {
        width: "100%",
        marginBottom: styles.spacing.md,
        flexDirection: "row",
        alignItems: "center",
        height: styles.heights.inputsAndButtons,
    },
    input: {
        borderWidth: 1,
        borderColor: styles.colors.border,
        borderRadius: styles.radius.md,
        height: "100%",
        width: undefined,
        flex: 1,
        paddingHorizontal: 40,
        fontSize: 16,
    },
    iconWrapper: {
        height: "100%",
        width: styles.heights.inputsAndButtons,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
    },
    option: {
        height: styles.heights.inputsAndButtons,
        paddingHorizontal: styles.spacing.lg,
        justifyContent: "center",
        backgroundColor: styles.colors.backgroundItems,
        borderWidth: 1,
        borderColor: styles.colors.border,
        borderRadius: styles.radius.md,
        marginBottom: styles.spacing.md,
    },
    optionText: {
        fontSize: 16,
    },
});
