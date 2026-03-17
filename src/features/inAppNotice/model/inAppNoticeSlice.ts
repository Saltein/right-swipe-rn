import { RootState } from "../../../app/store";
import { Notice } from "./inAppNoticeTypes";
import { createSelector, createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
    queueStack: Notice[];
}

const initialState: InitialStateType = {
    queueStack: [
        { id: "1", type: "info", content: "test notice 1" },
        { id: "2", type: "error", content: "test notice 2" },
        { id: "3", type: "warning", content: "test notice 3" },
        { id: "4", type: "success", content: "test notice 4" },
        { id: "5", type: "info", content: "test notice 5" },
        { id: "6", type: "info", content: "test notice 6" },
        { id: "7", type: "info", content: "test notice 7" },
        { id: "8", type: "info", content: "test notice 8" },
    ],
};

const inAppNoticeSlice = createSlice({
    name: "inAppNotice",
    initialState,
    reducers: {
        addNotice: (state, action: { payload: Notice }) => {
            state.queueStack.push(action.payload);
        },
        removeNotice: (state, action: { payload: string }) => {
            state.queueStack = state.queueStack.filter(
                (notice) => notice.id !== action.payload,
            );
        },
    },
});

export const { addNotice, removeNotice } = inAppNoticeSlice.actions;
export default inAppNoticeSlice.reducer;

export const selectQueueStack = (state: RootState) =>
    state.inAppNotice.queueStack;

export const selectFirstThreeQueueStack = createSelector(
    [selectQueueStack],
    (queueStack) => queueStack.slice(0, 3),
);
