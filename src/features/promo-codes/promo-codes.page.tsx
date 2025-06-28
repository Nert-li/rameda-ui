import { useState } from 'react';
import { usePromoCodesList } from "@/features/promo-codes/model/use-promo-code";
import { PromoCodesTable } from "./ui/promo-codes-table";
import { CreatePromoCodeForm } from "./ui/create-promo-code-form";
import { PromoCode } from "./ui/columns";
import { Button } from "@/shared/ui/kit/button";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/kit/dialog";
import { HeaderContent } from "@/shared/model/use-header-content";
import { Plus } from "lucide-react";

export function Component() {
    const { promoCodes, isLoading, sorting, pagination, refetch } = usePromoCodesList();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const handlePromoCodeCreated = () => {
        setIsCreateDialogOpen(false);
        refetch(); // Обновляем список promo codes
    };

    const handlePromoCodeUpdated = () => {
        refetch(); // Обновляем список promo codes
    };

    const handlePromoCodeDeleted = () => {
        refetch(); // Обновляем список promo codes
    };

    return (
        <>
            <HeaderContent>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Plus className="h-[1.2rem] w-[1.2rem]" />
                            <span className="sr-only">Создать promo code</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <CreatePromoCodeForm
                            onSuccess={handlePromoCodeCreated}
                            onCancel={() => setIsCreateDialogOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </HeaderContent>

            <PromoCodesTable
                data={promoCodes as PromoCode[]}
                sorting={sorting}
                pagination={pagination}
                isLoading={isLoading}
                onPromoCodeUpdated={handlePromoCodeUpdated}
                onPromoCodeDeleted={handlePromoCodeDeleted}
            />
        </>
    );
} 