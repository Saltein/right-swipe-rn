import { useEffect, useState } from "react";

export function useNoticeVisibility(
    notice: string,
    trigger: number,
    delay = 5000,
) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!notice) return;

        setIsVisible(true);

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [notice, trigger, delay]);

    return isVisible;
}
