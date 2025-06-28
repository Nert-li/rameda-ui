import { rqClient } from "@/shared/api/instance";

// Конфигурация для API хука обновления
interface UpdateConfig<T extends string> {
    endpoint: string; // может содержать параметры типа "/users/{id}"
    method?: 'put' | 'patch' | 'post';
    dataKey?: T;
}

// Параметры для обновления
interface UpdateParams<D = unknown> {
    id: string | number;
    data: D;
}

// Опции для обновления
interface UpdateOptions<T = unknown> {
    onSuccess?: (data: T) => void;
    onError?: (error: unknown) => void;
    onSettled?: () => void;
}

// Результат базового хука обновления
type UpdateResult<T = unknown> = {
    mutate: (params: UpdateParams) => void;
    mutateAsync: (params: UpdateParams) => Promise<T>;
    data?: T;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error?: unknown;
    reset: () => void;
};

// Результат хука с расширенными возможностями
type UpdateWithOptionsResult<T = unknown> = UpdateResult<T> & {
    updateEntity: (params: UpdateParams, options?: UpdateOptions<T>) => void;
    updateEntityAsync: (params: UpdateParams, options?: UpdateOptions<T>) => Promise<T>;
};

/**
 * Базовый универсальный хук для обновления сущностей
 */
export function useUpdateDefault<T = unknown>(
    config: UpdateConfig<string>
): UpdateResult<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mutation = (rqClient.useMutation as any)(
        config.method || "put",
        config.endpoint
    );

    return {
        mutate: (params: UpdateParams) => {
            mutation.mutate({
                params: {
                    path: { id: params.id }
                },
                body: params.data
            });
        },
        mutateAsync: async (params: UpdateParams): Promise<T> => {
            const result = await mutation.mutateAsync({
                params: {
                    path: { id: params.id }
                },
                body: params.data
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
 * Универсальный хук обновления с расширенными возможностями
 */
export function useUpdate<T = unknown>(
    config: UpdateConfig<string>,
    defaultOptions: UpdateOptions<T> = {}
): UpdateWithOptionsResult<T> {
    const baseUpdate = useUpdateDefault<T>(config);

    const updateEntity = (params: UpdateParams, options: UpdateOptions<T> = {}) => {
        const mergedOptions = { ...defaultOptions, ...options };

        baseUpdate.mutate(params);

        // Обработка коллбэков (в реальном приложении лучше использовать onSuccess/onError в мутации)
        if (baseUpdate.isSuccess && mergedOptions.onSuccess) {
            mergedOptions.onSuccess(baseUpdate.data as T);
        }
        if (baseUpdate.isError && mergedOptions.onError) {
            mergedOptions.onError(baseUpdate.error);
        }
        if (mergedOptions.onSettled) {
            mergedOptions.onSettled();
        }
    };

    const updateEntityAsync = async (params: UpdateParams, options: UpdateOptions<T> = {}): Promise<T> => {
        const mergedOptions = { ...defaultOptions, ...options };

        try {
            const result = await baseUpdate.mutateAsync(params);
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
        ...baseUpdate,
        updateEntity,
        updateEntityAsync,
    };
}

/**
 * Фабрика для создания специфических хуков обновления для конкретной сущности
 */
export function createUpdateHooks<T = unknown>(config: UpdateConfig<string>) {
    const useEntityUpdateDefault = () =>
        useUpdateDefault<T>(config);

    const useEntityUpdate = (defaultOptions: UpdateOptions<T> = {}) =>
        useUpdate<T>(config, defaultOptions);

    return {
        useEntityUpdateDefault,
        useEntityUpdate
    };
}

// Экспорт типов для переиспользования
export type { UpdateConfig, UpdateParams, UpdateOptions, UpdateResult, UpdateWithOptionsResult }; 