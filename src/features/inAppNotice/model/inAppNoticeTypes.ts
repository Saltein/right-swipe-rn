export type NoticeType = "info" | "error" | "warning" | "success";

export type Notice = {
    id: string;
    type: NoticeType;
    content: string;
};
