import { Button } from "@/shared/ui/kit/button";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Form,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateBuyer } from "../model/use-update-buyer";
import { Buyer } from "@/shared/api/schema/generated";

const updateBuyerSchema = z.object({
    name: z
        .string({
            required_error: "Name is required",
        })
        .min(2, "Name must be at least 2 characters"),
});

export function UpdateBuyerForm({
    buyer,
    onSuccess,
}: {
    buyer: Buyer,
    onSuccess?: () => void;
}) {
    const form = useForm({
        resolver: zodResolver(updateBuyerSchema),
        defaultValues: {
            name: buyer.name,
        }
    });

    const { isPending, updateBuyer } = useUpdateBuyer();

    const onSubmit = form.handleSubmit(async (data) => {
        await updateBuyer({
            params: { buyerId: buyer.id },
            body: data,
        }, {
            onSuccess: () => {
                form.reset();
                onSuccess?.();
            }
        });
    });

    return (
        <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Buyer Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter buyer name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isPending} type="submit">
                    {isPending ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </Form>
    );
} 