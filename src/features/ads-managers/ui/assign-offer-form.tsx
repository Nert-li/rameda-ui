import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/shared/ui/kit/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Label } from "@/shared/ui/kit/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/kit/select";
import { useOffersList, useUpdateOffer } from '@/features/offers';

interface AssignOfferFormProps {
    adsManagerId: string;
    onSuccess: () => void;
}

interface AssignOfferFormData {
    offerId: string;
}

export const AssignOfferForm: React.FC<AssignOfferFormProps> = ({
    adsManagerId,
    onSuccess
}) => {
    const { offers, isLoading: isOffersLoading } = useOffersList();
    const { updateOffer, isPending } = useUpdateOffer();

    const {
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<AssignOfferFormData>();

    const selectedOfferId = watch('offerId');

    // Filter offers that are not assigned to any ads manager
    const availableOffers = offers?.filter(offer => !offer.ads_manager_id) || [];

    const onSubmit = (data: AssignOfferFormData) => {
        const selectedOffer = offers?.find(offer => offer.id?.toString() === data.offerId);

        if (!selectedOffer || !selectedOffer.name || !selectedOffer.aasm_status) return;

        const updateData = {
            offer: {
                name: selectedOffer.name,
                aasm_status: selectedOffer.aasm_status,
                ads_manager_id: adsManagerId,
            },
        };

        updateOffer(
            {
                params: { path: { offerId: data.offerId } },
                body: updateData,
            },
            {
                onSuccess: () => {
                    reset();
                    onSuccess();
                },
            }
        );
    };

    if (isOffersLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-2">Loading offers...</span>
            </div>
        );
    }

    if (availableOffers.length === 0) {
        return (
            <div className="text-center p-8">
                <p className="text-muted-foreground">No unassigned offers available.</p>
                <p className="text-sm text-muted-foreground mt-2">
                    All offers are already assigned to ads managers.
                </p>
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Assign Offer to Ads Manager</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="offerId">Select Offer *</Label>
                        <Select
                            value={selectedOfferId}
                            onValueChange={(value) => setValue('offerId', value)}
                            disabled={isPending}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Choose an offer to assign" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableOffers.map((offer) => (
                                    <SelectItem key={offer.id} value={offer.id || ''}>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{offer.name}</span>
                                            <span className="text-sm text-muted-foreground">
                                                Status: {offer.aasm_status}
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.offerId && (
                            <p className="text-sm text-red-500">Please select an offer</p>
                        )}
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => reset()}
                            disabled={isPending}
                            className="flex-1"
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending || !selectedOfferId}
                            className="flex-1"
                        >
                            {isPending ? "Assigning..." : "Assign Offer"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}; 