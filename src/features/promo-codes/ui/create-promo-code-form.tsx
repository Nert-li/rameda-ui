import { useState } from 'react';
import { Button } from '@/shared/ui/kit/button';
import { Input } from '@/shared/ui/kit/input';
import { Label } from '@/shared/ui/kit/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/kit/card';
import { useCreatePromoCode, type CreatePromoCodeData } from '../model/use-promo-code';

interface CreatePromoCodeFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function CreatePromoCodeForm({ onSuccess, onCancel }: CreatePromoCodeFormProps) {
    const { createEntity, isLoading } = useCreatePromoCode();

    const [formData, setFormData] = useState<CreatePromoCodeData>({
        name: '',
        discount_percent: 0,
        country: '',
        is_active: true,
        expires_at: ''
    });

    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);

        // Простая валидация
        if (!formData.name || formData.discount_percent <= 0) {
            setErrors(['Название и процент скидки обязательны']);
            return;
        }

        if (formData.discount_percent > 100) {
            setErrors(['Процент скидки не может быть больше 100%']);
            return;
        }

        try {
            await createEntity(formData);
            onSuccess?.();
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error &&
                error.response && typeof error.response === 'object' &&
                'data' in error.response && error.response.data &&
                typeof error.response.data === 'object' && 'errors' in error.response.data) {
                setErrors(error.response.data.errors as string[]);
            } else {
                setErrors(['Произошла ошибка при создании promo code']);
            }
        }
    };

    const handleChange = (field: keyof CreatePromoCodeData, value: string | number | boolean) => {
        setFormData((prev: CreatePromoCodeData) => ({ ...prev, [field]: value }));
    };

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Создать новый promo code</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {errors.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-3">
                            {errors.map((error, index) => (
                                <div key={index} className="text-red-600 text-sm">
                                    {error}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Название *</Label>
                            <Input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="SAVE20"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="discount_percent">Процент скидки *</Label>
                            <Input
                                id="discount_percent"
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                value={formData.discount_percent}
                                onChange={(e) => handleChange('discount_percent', parseFloat(e.target.value) || 0)}
                                placeholder="20"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="country">Страна</Label>
                            <Input
                                id="country"
                                value={formData.country || ''}
                                onChange={(e) => handleChange('country', e.target.value)}
                                placeholder="RU"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expires_at">Дата истечения</Label>
                            <Input
                                id="expires_at"
                                type="datetime-local"
                                value={formData.expires_at || ''}
                                onChange={(e) => handleChange('expires_at', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="is_active">Статус</Label>
                        <select
                            id="is_active"
                            value={formData.is_active ? 'true' : 'false'}
                            onChange={(e) => handleChange('is_active', e.target.value === 'true')}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="true">Активный</option>
                            <option value="false">Неактивный</option>
                        </select>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1"
                        >
                            {isLoading ? 'Создание...' : 'Создать promo code'}
                        </Button>

                        {onCancel && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={isLoading}
                            >
                                Отмена
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
} 