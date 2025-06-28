import { rqClient } from "@/shared/api/instance";

// Конфигурация для API хука удаления
interface DeleteConfig<T extends string> {
    endpoint: string; // может содержать параметры типа "/users/{id}"
    method?: 'delete' | 'post';
    dataKey?: T;
}

// Параметры для удаления
interface DeleteParams {
    id: string | number;
    additionalData?: Record<string, unknown>; // для случаев когда нужна дополнительная информация
}

// Опции для удаления
interface DeleteOptions<T = unknown> {
    onSuccess?: (data?: T) => void;
    onError?: (error: unknown) => void;
    onSettled?: () => void;
    confirmMessage?: string; // сообщение для подтверждения удаления
}

// Результат базового хука удаления
type DeleteResult<T = unknown> = {
    mutate: (params: DeleteParams) => void;
    mutateAsync: (params: DeleteParams) => Promise<T>;
    data?: T;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error?: unknown;
    reset: () => void;
};

// Результат хука с расширенными возможностями
type DeleteWithOptionsResult<T = unknown> = DeleteResult<T> & {
    deleteEntity: (params: DeleteParams, options?: DeleteOptions<T>) => void;
    deleteEntityAsync: (params: DeleteParams, options?: DeleteOptions<T>) => Promise<T>;
    deleteWithConfirm: (params: DeleteParams, options?: DeleteOptions<T>) => void;
};

/**
 * Базовый универсальный хук для удаления сущностей
 */
export function useDeleteDefault<T = unknown>(
    config: DeleteConfig<string>
): DeleteResult<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mutation = (rqClient.useMutation as any)(
        config.method || "delete",
        config.endpoint
    );

    return {
        mutate: (params: DeleteParams) => {
            const requestParams: Record<string, unknown> = {
                params: {
                    path: { id: params.id }
                }
            };

            // Если есть дополнительные данные, добавляем их в body для POST запросов
            if (params.additionalData && config.method === 'post') {
                requestParams.body = params.additionalData;
            }

            mutation.mutate(requestParams);
        },
        mutateAsync: async (params: DeleteParams): Promise<T> => {
            const requestParams: Record<string, unknown> = {
                params: {
                    path: { id: params.id }
                }
            };

            // Если есть дополнительные данные, добавляем их в body для POST запросов
            if (params.additionalData && config.method === 'post') {
                requestParams.body = params.additionalData;
            }

            const result = await mutation.mutateAsync(requestParams);
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
 * Универсальный хук удаления с расширенными возможностями
 */
export function useDelete<T = unknown>(
    config: DeleteConfig<string>,
    defaultOptions: DeleteOptions<T> = {}
): DeleteWithOptionsResult<T> {
    const baseDelete = useDeleteDefault<T>(config);

    const deleteEntity = (params: DeleteParams, options: DeleteOptions<T> = {}) => {
        const mergedOptions = { ...defaultOptions, ...options };

        baseDelete.mutate(params);

        // Обработка коллбэков (в реальном приложении лучше использовать onSuccess/onError в мутации)
        if (baseDelete.isSuccess && mergedOptions.onSuccess) {
            mergedOptions.onSuccess(baseDelete.data);
        }
        if (baseDelete.isError && mergedOptions.onError) {
            mergedOptions.onError(baseDelete.error);
        }
        if (mergedOptions.onSettled) {
            mergedOptions.onSettled();
        }
    };

    const deleteEntityAsync = async (params: DeleteParams, options: DeleteOptions<T> = {}): Promise<T> => {
        const mergedOptions = { ...defaultOptions, ...options };

        try {
            const result = await baseDelete.mutateAsync(params);
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

    const deleteWithConfirm = (params: DeleteParams, options: DeleteOptions<T> = {}) => {
        const mergedOptions = { ...defaultOptions, ...options };
        const confirmMessage = mergedOptions.confirmMessage || 'Вы уверены, что хотите удалить этот элемент?';

        if (window.confirm(confirmMessage)) {
            deleteEntity(params, options);
        }
    };

    return {
        ...baseDelete,
        deleteEntity,
        deleteEntityAsync,
        deleteWithConfirm,
    };
}

/**
 * Фабрика для создания специфических хуков удаления для конкретной сущности
 */
export function createDeleteHooks<T = unknown>(config: DeleteConfig<string>) {
    const useEntityDeleteDefault = () =>
        useDeleteDefault<T>(config);

    const useEntityDelete = (defaultOptions: DeleteOptions<T> = {}) =>
        useDelete<T>(config, defaultOptions);

    return {
        useEntityDeleteDefault,
        useEntityDelete
    };
}

// Экспорт типов для переиспользования
export type { DeleteConfig, DeleteParams, DeleteOptions, DeleteResult, DeleteWithOptionsResult }; 