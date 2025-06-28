import { useState } from 'react';
import { useCreateOffer } from '@/features/offers/model/use-offer';
import { Button } from '@/shared/ui/kit/button';
import { Input } from '@/shared/ui/kit/input';
import { Label } from '@/shared/ui/kit/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/kit/select';

interface CreateOfferFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function CreateOfferForm({ onSuccess, onCancel }: CreateOfferFormProps) {
    const { createEntity, isLoading } = useCreateOffer();
    const [formData, setFormData] = useState({
        name: '',
        status: 'draft' as const,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createEntity({
                name: formData.name,
                aasm_status: formData.status,
            });
            onSuccess?.();
        } catch (error) {
            console.error('Failed to create offer:', error);
        }
    };

    const handleInputChange = (field: string) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Создать оффер</h2>
                <p className="text-sm text-muted-foreground">
                    Заполните информацию для создания нового оффера
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
                        {isLoading ? 'Создание...' : 'Создать оффер'}
                    </Button>
                </div>
            </form>
        </div>
    );
} 