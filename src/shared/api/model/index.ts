// Экспорт хуков для получения списков
export {
    useListDefault,
    useList,
    createListHooks,
    type ListConfig,
    type ListParams,
    type ListResult,
    type ListWithControlsResult
} from './use-list';

// Экспорт хуков для создания
export {
    useCreateDefault,
    useCreate,
    createCreateHooks,
    type CreateConfig,
    type CreateParams,
    type CreateOptions,
    type CreateResult,
    type CreateWithOptionsResult
} from './use-create';

// Экспорт хуков для обновления
export {
    useUpdateDefault,
    useUpdate,
    createUpdateHooks,
    type UpdateConfig,
    type UpdateParams,
    type UpdateOptions,
    type UpdateResult,
    type UpdateWithOptionsResult
} from './use-update';

// Экспорт хуков для удаления
export {
    useDeleteDefault,
    useDelete,
    createDeleteHooks,
    type DeleteConfig,
    type DeleteParams,
    type DeleteOptions,
    type DeleteResult,
    type DeleteWithOptionsResult
} from './use-delete';

// Импорты фабрик для функции createCrudHooks
import { createListHooks } from './use-list';
import { createCreateHooks } from './use-create';
import { createUpdateHooks } from './use-update';
import { createDeleteHooks } from './use-delete';

// Общие утилиты для создания полного набора CRUD хуков
export function createCrudHooks<T = unknown>(config: {
    entityName: string;
    basePath: string;
    dataKey?: string;
}) {
    const dataKey = config.dataKey || config.entityName.toLowerCase();

    const listConfig = {
        endpoint: config.basePath,
        dataKey: dataKey,
    };

    const createConfig = {
        endpoint: config.basePath,
        dataKey: dataKey,
    };

    const updateConfig = {
        endpoint: `${config.basePath}/{id}`,
        dataKey: dataKey,
    };

    const deleteConfig = {
        endpoint: `${config.basePath}/{id}`,
        dataKey: dataKey,
    };

    return {
        ...createListHooks<string, T>(listConfig),
        ...createCreateHooks<T>(createConfig),
        ...createUpdateHooks<T>(updateConfig),
        ...createDeleteHooks<T>(deleteConfig),
    };
} 