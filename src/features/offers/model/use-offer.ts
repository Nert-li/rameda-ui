import { createCrudHooks } from "@/shared/api";
import type { components } from "@/shared/api/schema/generated";

// Типы для offers из OpenAPI схемы
export type Offer = components["schemas"]["OfferRecord"];
export type CreateOfferData = components["schemas"]["OfferInput"];

// Создаем полный набор CRUD хуков для offers
const {
    useEntityList,
    useEntityListDefault,
    useEntityCreate,
    useEntityUpdate,
    useEntityDelete
} = createCrudHooks<Offer>({
    entityName: "offers",
    basePath: "/offers",
    dataKey: "offers"
});

// Экспортируем типизированные хуки
export const useOffersList = () => useEntityList(1, 25);
export const useOffersListDefault = useEntityListDefault;

export const useCreateOffer = () => useEntityCreate({
    onSuccess: (offer) => {
        console.log("Offer создан:", offer);
    },
    onError: (error) => {
        console.error("Ошибка создания offer:", error);
    }
});

export const useUpdateOffer = () => useEntityUpdate({
    onSuccess: (offer) => {
        console.log("Offer обновлён:", offer);
    },
    onError: (error) => {
        console.error("Ошибка обновления offer:", error);
    }
});

export const useDeleteOffer = () => useEntityDelete({
    confirmMessage: "Вы уверены, что хотите удалить этот offer?",
    onSuccess: () => {
        console.log("Offer удалён");
    },
    onError: (error) => {
        console.error("Ошибка удаления offer:", error);
    }
}); 