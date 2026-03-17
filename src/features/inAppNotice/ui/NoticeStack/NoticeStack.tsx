import { View, StyleSheet } from "react-native";
import { Portal } from "react-native-paper";
import { styles } from "../../../../shared";
import { NoticeItem } from "../NoticeItem/NoticeItem";
import { useSelector } from "react-redux";
import { selectFirstThreeQueueStack } from "../../model/inAppNoticeSlice";
import { Notice } from "../../model/inAppNoticeTypes";

export function NoticeStack() {
    const notices = useSelector(selectFirstThreeQueueStack);

    return (
        <Portal>
            <View style={s.container}>
                {notices.map((notice: Notice) => (
                    <NoticeItem notice={notice} key={notice.id} />
                ))}
            </View>
        </Portal>
    );
}

const s = StyleSheet.create({
    container: {
        gap: styles.spacing.sm,
        padding: styles.spacing.lg,
    },
});
