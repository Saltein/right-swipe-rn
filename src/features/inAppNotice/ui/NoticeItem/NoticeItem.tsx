import { StyleSheet, Pressable } from "react-native";
import { DefaultText, styles } from "../../../../shared";
import { Notice } from "../../model/inAppNoticeTypes";
import { useDispatch } from "react-redux";
import { removeNotice } from "../../model/inAppNoticeSlice";
import { useEffect } from "react";

export type NoticeProps = {
    notice: Notice;
};

export function NoticeItem({ notice }: NoticeProps) {
    const { id, type, content } = notice;

    const dispatch = useDispatch();

    let backgroundColor = "";
    let color = "";
    if (type === "info") {
        backgroundColor = styles.colors.backgroundInfo;
        color = styles.colors.info;
    } else if (type === "error") {
        backgroundColor = styles.colors.backgroundError;
        color = styles.colors.error;
    } else if (type === "warning") {
        backgroundColor = styles.colors.backgroundWarning;
        color = styles.colors.warning;
    } else if (type === "success") {
        backgroundColor = styles.colors.backgroundSuccess;
        color = styles.colors.success;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(removeNotice(id));
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    function handlePress() {
        dispatch(removeNotice(id));
    }

    return (
        <Pressable
            onPress={handlePress}
            style={[s.container, { backgroundColor: backgroundColor }]}
        >
            <DefaultText style={{ color: color }}>{content}</DefaultText>
        </Pressable>
    );
}

const s = StyleSheet.create({
    container: {
        paddingHorizontal: styles.spacing.lg,
        paddingVertical: styles.spacing.md,
        minHeight: styles.heights.inputsAndButtons,
        justifyContent: "center",
        borderRadius: styles.radius.lg,
        elevation: 6,
    },
});
