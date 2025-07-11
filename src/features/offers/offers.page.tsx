import { useState } from 'react';
import { useOffersList } from "@/features/offers/model/use-offer";
import { OffersTable } from "./ui/offers-table";
import { CreateOfferForm } from "./ui/create-offer-form";
import { Offer } from "./ui/columns";
import { Button } from "@/shared/ui/kit/button";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/kit/dialog";
import { HeaderContent } from "@/shared/model/use-header-content";
import { Plus } from "lucide-react";

function OffersPage() {
    const { offers, isLoading, sorting, pagination, refetch } = useOffersList();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const handleOfferCreated = () => {
        setIsCreateDialogOpen(false);
        refetch(); // Обновляем список offers
    };

    const handleOfferUpdated = () => {
        refetch(); // Обновляем список offers
    };

    const handleOfferDeleted = () => {
        refetch(); // Обновляем список offers
    };

    return (
        <div className="flex flex-col h-full p-4 gap-4">
            <HeaderContent>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Plus className="h-[1.2rem] w-[1.2rem]" />
                            <span className="sr-only">Создать оффер</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <CreateOfferForm
                            onSuccess={handleOfferCreated}
                            onCancel={() => setIsCreateDialogOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </HeaderContent>

            <OffersTable
                data={offers as Offer[]}
                sorting={sorting}
                pagination={pagination}
                isLoading={isLoading}
                onOfferUpdated={handleOfferUpdated}
                onOfferDeleted={handleOfferDeleted}
            />
        </div>
    );
}

export const Component = OffersPage;
