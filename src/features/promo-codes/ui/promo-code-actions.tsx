import { useState } from 'react';
import { Button } from '@/shared/ui/kit/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/kit/dialog';
import { useDeletePromoCode, type PromoCode } from '../model/use-promo-code';
import { UpdatePromoCodeForm } from './update-promo-code-form';

interface PromoCodeActionsProps {
    promoCode: PromoCode;
    onPromoCodeUpdated?: () => void;
    onPromoCodeDeleted?: () => void;
}

export function PromoCodeActions({
    promoCode,
    onPromoCodeUpdated,
    onPromoCodeDeleted
}: PromoCodeActionsProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const { deleteEntity, isLoading: isDeleting } = useDeletePromoCode();

    const handleUpdate = () => {
        setIsEditDialogOpen(false);
        onPromoCodeUpdated?.();
    };

    const handleDelete = async () => {
        if (!promoCode.id) return;

        try {
            await deleteEntity({ id: promoCode.id });
            onPromoCodeDeleted?.();
        } catch (error) {
            console.error('Ошибка при удалении promo code:', error);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        Редактировать
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                    <UpdatePromoCodeForm
                        promoCode={promoCode}
                        onSuccess={handleUpdate}
                        onCancel={() => setIsEditDialogOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
            >
                {isDeleting ? 'Удаление...' : 'Удалить'}
            </Button>
        </div>
    );
} 