import { RootState } from "../../../app/store";
import { Notice } from "./inAppNoticeTypes";
import { createSelector, createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
    queueStack: Notice[];
}

const initialState: InitialStateType = {
    queueStack: [],
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
