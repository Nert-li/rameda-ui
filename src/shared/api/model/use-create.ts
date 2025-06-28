import { rqClient } from "@/shared/api/instance";

// Конфигурация для API хука создания
interface CreateConfig<T extends string> {
    endpoint: string;
    method?: 'post' | 'put';
    dataKey?: T;
}

// Параметры для создания
interface CreateParams<D = unknown> {
    data: D;
}

// Опции для создания
interface CreateOptions<T = unknown> {
    onSuccess?: (data: T) => void;
    onError?: (error: unknown) => void;
    onSettled?: () => void;
}

// Результат базового хука создания
type CreateResult<T = unknown> = {
    mutate: (data: unknown) => void;
    mutateAsync: (data: unknown) => Promise<T>;
    data?: T;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error?: unknown;
    reset: () => void;
};

// Результат хука с расширенными возможностями
type CreateWithOptionsResult<T = unknown> = CreateResult<T> & {
    createEntity: (data: unknown, options?: CreateOptions<T>) => void;
    createEntityAsync: (data: unknown, options?: CreateOptions<T>) => Promise<T>;
};

/**
 * Базовый универсальный хук для создания сущностей
 */
export function useCreateDefault<T = unknown>(
    config: CreateConfig<string>
): CreateResult<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mutation = (rqClient.useMutation as any)(
        config.method || "post",
        config.endpoint
    );

    return {
        mutate: (data: unknown) => {
            mutation.mutate({
                body: data
            });
        },
        mutateAsync: async (data: unknown): Promise<T> => {
            const result = await mutation.mutateAsync({
                body: data
            });
            return config.dataKey ? result[config.dataKey] : result;
        },
        data: mutation.data,
        isLoading: mutation.isPending || mutation.isLoading,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
        error: mutation.error,
        reset: mutation.reset,
    };
}

/**
 * Универсальный хук создания с расширенными возможностями
 */
export function useCreate<T = unknown>(
    config: CreateConfig<string>,
    defaultOptions: CreateOptions<T> = {}
): CreateWithOptionsResult<T> {
    const baseCreate = useCreateDefault<T>(config);

    const createEntity = (data: unknown, options: CreateOptions<T> = {}) => {
        const mergedOptions = { ...defaultOptions, ...options };

        baseCreate.mutate(data);

        // Обработка коллбэков (в реальном приложении лучше использовать onSuccess/onError в мутации)
        if (baseCreate.isSuccess && mergedOptions.onSuccess) {
            mergedOptions.onSuccess(baseCreate.data as T);
        }
        if (baseCreate.isError && mergedOptions.onError) {
            mergedOptions.onError(baseCreate.error);
        }
        if (mergedOptions.onSettled) {
            mergedOptions.onSettled();
        }
    };

    const createEntityAsync = async (data: unknown, options: CreateOptions<T> = {}): Promise<T> => {
        const mergedOptions = { ...defaultOptions, ...options };

        try {
            const result = await baseCreate.mutateAsync(data);
            if (mergedOptions.onSuccess) {
                mergedOptions.onSuccess(result);
            }
            if (mergedOptions.onSettled) {
                mergedOptions.onSettled();
            }
            return result;
        } catch (error) {
            if (mergedOptions.onError) {
                mergedOptions.onError(error);
            }
            if (mergedOptions.onSettled) {
                mergedOptions.onSettled();
            }
            throw error;
        }
    };

    return {
        ...baseCreate,
        createEntity,
        createEntityAsync,
    };
}

/**
 * Фабрика для создания специфических хуков создания для конкретной сущности
 */
export function createCreateHooks<T = unknown>(config: CreateConfig<string>) {
    const useEntityCreateDefault = () =>
        useCreateDefault<T>(config);

    const useEntityCreate = (defaultOptions: CreateOptions<T> = {}) =>
        useCreate<T>(config, defaultOptions);

    return {
        useEntityCreateDefault,
        useEntityCreate
    };
}

// Экспорт типов для переиспользования
export type { CreateConfig, CreateParams, CreateOptions, CreateResult, CreateWithOptionsResult }; 