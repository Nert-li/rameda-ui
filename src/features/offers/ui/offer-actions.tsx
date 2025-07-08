import { useState } from 'react';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/kit/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/ui/kit/dropdown-menu';
import { Dialog, DialogContent } from '@/shared/ui/kit/dialog';
import { UpdateOfferForm } from './update-offer-form';
import { useDeleteOffer } from '@/features/offers/model/use-offer';
import { Offer } from './columns';

interface OfferActionsProps {
    offer: Offer;
    onOfferUpdated?: () => void;
    onOfferDeleted?: () => void;
}

export function OfferActions({ offer, onOfferUpdated, onOfferDeleted }: OfferActionsProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const { deleteWithConfirm } = useDeleteOffer();

    const handleEdit = () => {
        setIsEditDialogOpen(true);
    };

    const handleDelete = async () => {
        deleteWithConfirm(
            { id: offer.id! },
            {
                confirmMessage: `Вы уверены, что хотите удалить оффер "${offer.name || 'Offer'}"?`,
                onSuccess: () => {
                    onOfferDeleted?.();
                }
            }
        );
    };

    const handleEditSuccess = () => {
        setIsEditDialogOpen(false);
        onOfferUpdated?.();
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleEdit}>
                        <Edit className="mr-2 h-4 w-4" />
                        Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleDelete}
                        className="text-destructive"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Удалить
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <UpdateOfferForm
                        offer={offer}
                        onSuccess={handleEditSuccess}
                        onCancel={() => setIsEditDialogOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
} 