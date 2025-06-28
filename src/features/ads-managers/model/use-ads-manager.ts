import { createCrudHooks } from "@/shared/api";
import type { components } from "@/shared/api/schema/generated";

// Типы для ads-managers из OpenAPI схемы
export type AdsManager = components["schemas"]["AdsManagerRecord"];
export type CreateAdsManagerData = components["schemas"]["CreateAdsManagerRequest"];

// Создаем полный набор CRUD хуков для ads-managers
const {
    useEntityList,
    useEntityListDefault,
    useEntityCreate,
    useEntityUpdate,
    useEntityDelete
} = createCrudHooks<AdsManager>({
    entityName: "ads_managers",
    basePath: "/ads_managers",
    dataKey: "adsManagers"
});

// Экспортируем типизированные хуки
export const useAdsManagersList = () => useEntityList(1, 25);
export const useAdsManagersListDefault = useEntityListDefault;

export const useCreateAdsManager = () => useEntityCreate({
    onSuccess: (adsManager) => {
        console.log("Ads manager создан:", adsManager);
    },
    onError: (error) => {
        console.error("Ошибка создания ads manager:", error);
    }
});

export const useUpdateAdsManager = () => useEntityUpdate({
    onSuccess: (adsManager) => {
        console.log("Ads manager обновлён:", adsManager);
    },
    onError: (error) => {
        console.error("Ошибка обновления ads manager:", error);
    }
});

export const useDeleteAdsManager = () => useEntityDelete({
    confirmMessage: "Вы уверены, что хотите удалить этого ads manager?",
    onSuccess: () => {
        console.log("Ads manager удалён");
    },
    onError: (error) => {
        console.error("Ошибка удаления ads manager:", error);
    }
}); 