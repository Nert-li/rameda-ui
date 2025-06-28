import { useState, useEffect } from 'react';
import { useUpdateOffer } from '@/features/offers/model/use-offer';
import { Button } from '@/shared/ui/kit/button';
import { Input } from '@/shared/ui/kit/input';
import { Label } from '@/shared/ui/kit/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/kit/select';
import { Offer } from './columns';

interface UpdateOfferFormProps {
    offer: Offer;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function UpdateOfferForm({ offer, onSuccess, onCancel }: UpdateOfferFormProps) {
    const { updateEntity, isLoading } = useUpdateOffer();
    const [formData, setFormData] = useState({
        name: '',
        status: 'draft' as 'draft' | 'active' | 'paused' | 'archived',
    });

    useEffect(() => {
        if (offer) {
            setFormData({
                name: offer.name || '',
                status: (offer.aasm_status as 'draft' | 'active' | 'paused' | 'archived') || 'draft',
            });
        }
    }, [offer]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateEntity({
                id: offer.id!,
                data: {
                    name: formData.name,
                    aasm_status: formData.status,
                }
            });
            onSuccess?.();
        } catch (error) {
            console.error('Failed to update offer:', error);
        }
    };

    const handleInputChange = (field: string) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Редактировать оффер</h2>
                <p className="text-sm text-muted-foreground">
                    Обновите информацию об оффере
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Название</Label>
                    <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name')(e.target.value)}
                        placeholder="Введите название оффера"
                        required
                    />
                </div>



                <div className="space-y-2">
                    <Label htmlFor="status">Статус</Label>
                    <Select value={formData.status} onValueChange={handleInputChange('status')}>
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="paused">Paused</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Отмена
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
                    </Button>
                </div>
            </form>
        </div>
    );
} 