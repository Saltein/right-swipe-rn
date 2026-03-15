import { useCallback, useRef, useState } from "react";

interface UseDebouncedSaveOptions {
    delay?: number;
    onSave?: () => void;
    onError?: (error: Error) => void;
}

interface DataWithTitleContent {
    title?: string;
    content?: string;
    [key: string]: any;
}

export function useDebouncedSave<T extends DataWithTitleContent>(
    saveFunction: (data: T) => Promise<void>,
    options: UseDebouncedSaveOptions = {},
) {
    const { delay = 1000, onSave, onError } = options;
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined,
    );
    const pendingDataRef = useRef<T | null>(null);

    const processData = useCallback((data: T): T => {
        const processedData = { ...data };

        if (processedData.title !== undefined && processedData.title !== null) {
            processedData.title = processedData.title.trim();
        }

        if (
            processedData.content !== undefined &&
            processedData.content !== null
        ) {
            processedData.content = processedData.content.trim();
        }

        return processedData;
    }, []);

    const debouncedSave = useCallback(
        (data: T) => {
            const processedData = processData(data);
            pendingDataRef.current = processedData;

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(async () => {
                if (pendingDataRef.current) {
                    setIsSaving(true);
                    try {
                        await saveFunction(pendingDataRef.current);
                        setLastSaved(new Date());
                        onSave?.();
                    } catch (error) {
                        onError?.(error as Error);
                    } finally {
                        setIsSaving(false);
                        pendingDataRef.current = null;
                    }
                }
            }, delay);
        },
        [delay, saveFunction, onSave, onError, processData],
    );

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            pendingDataRef.current = null;
        }
    }, []);

    return {
        debouncedSave,
        isSaving,
        lastSaved,
        cancel,
    };
}
