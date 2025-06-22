import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useCreateReport } from "@/features/ads-managers/model/use-create-report";
import { useAdsManagerOffers } from "@/features/ads-managers/model/use-ads-manager-offers";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/kit/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/kit/card";

interface ReportFormData {
    offer_id: string;
    spend: number;
    report_date: string;
}

interface CreateReportFormProps {
    adsManagerId: string;
    onSuccess: () => void;
}

export const CreateReportForm: React.FC<CreateReportFormProps> = ({
    adsManagerId,
    onSuccess
}) => {
    const { createReport, isPending } = useCreateReport();
    const { offers, isLoading: isOffersLoading } = useAdsManagerOffers(adsManagerId);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ReportFormData>({
        defaultValues: {
            report_date: new Date().toISOString().split('T')[0], // Today's date
        },
    });

    const onSubmit = (data: ReportFormData) => {
        const formattedData = {
            report: {
                offer_id: data.offer_id,
                spend: parseFloat(data.spend.toString()),
                report_date: data.report_date,
            },
        };

        createReport(
            {
                params: { path: { adsManagerId } },
                body: formattedData,
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

    if (!offers || offers.length === 0) {
        return (
            <div className="text-center p-8">
                <p className="text-muted-foreground">No offers available for this ads manager.</p>
                <p className="text-sm text-muted-foreground mt-2">
                    Please assign offers to this ads manager first.
                </p>
            </div>
        );
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Create Report</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="offer_id">Offer *</Label>
                        <Controller
                            name="offer_id"
                            control={control}
                            rules={{ required: "Please select an offer" }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={isPending}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an offer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {offers.map((offer) => (
                                            <SelectItem key={offer.id} value={offer.id!}>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{offer.name}</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        Clicks: {offer.clicks_count || 0} |
                                                        Conversions: {offer.conversions_count || 0}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.offer_id && (
                            <p className="text-sm text-red-500">{errors.offer_id.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="spend">Spend Amount ($) *</Label>
                        <Input
                            id="spend"
                            type="number"
                            step="0.01"
                            min="0"
                            {...register("spend", {
                                required: "Spend amount is required",
                                min: {
                                    value: 0,
                                    message: "Spend amount must be positive",
                                },
                                valueAsNumber: true,
                            })}
                            placeholder="0.00"
                            disabled={isPending}
                        />
                        {errors.spend && (
                            <p className="text-sm text-red-500">{errors.spend.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="report_date">Report Date *</Label>
                        <Input
                            id="report_date"
                            type="date"
                            {...register("report_date", {
                                required: "Report date is required",
                            })}
                            disabled={isPending}
                        />
                        {errors.report_date && (
                            <p className="text-sm text-red-500">{errors.report_date.message}</p>
                        )}
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => reset({
                                report_date: new Date().toISOString().split('T')[0],
                            })}
                            disabled={isPending}
                            className="flex-1"
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="flex-1"
                        >
                            {isPending ? "Creating..." : "Create Report"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}; 