import { createCrudHooks } from "@/shared/api";
import type { components } from "@/shared/api/schema/generated";

// Типы для promo-codes из OpenAPI схемы
export type PromoCode = components["schemas"]["PromoCodeRecord"];
export type CreatePromoCodeData = components["schemas"]["CreatePromoCodeRequest"];

// Создаем полный набор CRUD хуков для promo-codes
const {
    useEntityList,
    useEntityListDefault,
    useEntityCreate,
    useEntityUpdate,
    useEntityDelete
} = createCrudHooks<PromoCode>({
    entityName: "promo_codes",
    basePath: "/promo_codes",
    dataKey: "promoCodes"
});

// Экспортируем типизированные хуки
export const usePromoCodesList = () => useEntityList(1, 25);
export const usePromoCodesListDefault = useEntityListDefault;

export const useCreatePromoCode = () => useEntityCreate({
    onSuccess: (promoCode) => {
        console.log("Promo code создан:", promoCode);
    },
    onError: (error) => {
        console.error("Ошибка создания promo code:", error);
    }
});

export const useUpdatePromoCode = () => useEntityUpdate({
    onSuccess: (promoCode) => {
        console.log("Promo code обновлён:", promoCode);
    },
    onError: (error) => {
        console.error("Ошибка обновления promo code:", error);
    }
});

export const useDeletePromoCode = () => useEntityDelete({
    confirmMessage: "Вы уверены, что хотите удалить этот promo code?",
    onSuccess: () => {
        console.log("Promo code удалён");
    },
    onError: (error) => {
        console.error("Ошибка удаления promo code:", error);
    }
}); 