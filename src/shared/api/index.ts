// Экспорт всех CRUD хуков и утилит
export {
    // List hooks
    useListDefault,
    useList,
    createListHooks,
    // Create hooks
    useCreateDefault,
    useCreate,
    createCreateHooks,
    // Update hooks
    useUpdateDefault,
    useUpdate,
    createUpdateHooks,
    // Delete hooks
    useDeleteDefault,
    useDelete,
    createDeleteHooks,
    // Общие утилиты
    createCrudHooks,
    // Типы
    type ListConfig,
    type ListParams,
    type ListResult,
    type ListWithControlsResult,
    type CreateConfig,
    type CreateParams,
    type CreateOptions,
    type CreateResult,
    type CreateWithOptionsResult,
    type UpdateConfig,
    type UpdateParams,
    type UpdateOptions,
    type UpdateResult,
    type UpdateWithOptionsResult,
    type DeleteConfig,
    type DeleteParams,
    type DeleteOptions,
    type DeleteResult,
    type DeleteWithOptionsResult
} from "./model";