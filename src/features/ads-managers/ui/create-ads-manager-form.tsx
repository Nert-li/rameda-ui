import { useForm } from "react-hook-form";
import { useCreateAdsManager } from "@/features/ads-managers/model/use-ads-manager";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/kit/card";

interface AdsManagerFormData {
    title: string;
    id_rc?: string;
}

interface CreateAdsManagerFormProps {
    onSuccess: () => void;
}

export const CreateAdsManagerForm: React.FC<CreateAdsManagerFormProps> = ({ onSuccess }) => {
    const { createEntity, isLoading: isPending } = useCreateAdsManager();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AdsManagerFormData>();

    const onSubmit = async (data: AdsManagerFormData) => {
        const formattedData = {
            ads_manager: {
                title: data.title,
                id_rc: data.id_rc || null,
            },
        };

        try {
            await createEntity(formattedData);
            reset();
            onSuccess();
        } catch (error) {
            console.error('Failed to create ads manager:', error);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Create Ads Manager</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            {...register("title", {
                                required: "Title is required",
                                minLength: {
                                    value: 2,
                                    message: "Title must be at least 2 characters",
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Title must be less than 100 characters",
                                },
                            })}
                            placeholder="Enter ads manager title"
                            disabled={isPending}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="id_rc">ID RC</Label>
                        <Input
                            id="id_rc"
                            {...register("id_rc")}
                            placeholder="Enter ID RC (optional)"
                            disabled={isPending}
                        />
                        {errors.id_rc && (
                            <p className="text-sm text-red-500">{errors.id_rc.message}</p>
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
                            disabled={isPending}
                            className="flex-1"
                        >
                            {isPending ? "Creating..." : "Create"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}; 